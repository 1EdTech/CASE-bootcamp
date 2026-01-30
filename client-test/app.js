const newman = require('newman');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const dns = require('dns').promises;

const caseScheme = process.env.CASE_SCHEME || 'http';
const caseHost = process.env.CASE_HOST || 'host.docker.internal';

const casePort = process.env.CASE_PORT || '3000';

const postmanEnvironment = {
    "id": uuidv4(),
    "name": "CASE Test Environment",
    values: [
        {
            key: "apiBasePath",
            value: "ims/case/v1p1",
            type: "default",
            enabled: true
        },
        {
            key: "host",
            value: caseHost,
            type: "default",
            enabled: true
        },
        {
            key: "scheme",
            value: caseScheme,
            type: "default",
            enabled: true
        },
        {
            key: "port",
            value: casePort,
            type: "default",
            enabled: true
        }
    ]
}

async function test() {

    console.log(`Starting case-client-test server at ${postmanEnvironment.values[0].value}... `);

    try {

        // get the ip address of caseHost, since newman only works with IPs
        async function getHostIp(host) {
            try {
                const addresses = await dns.lookup(host);
                return addresses.address;
            } catch (err) {
                console.error(`Failed to resolve IP for ${host}:`, err.message);
                return host; // fallback to host if resolution fails
            }
        }

        const caseHostIpPromise = getHostIp(caseHost);
        postmanEnvironment.values.find(v => v.key === 'host').value = await caseHostIpPromise;

        const app = express();
        const port = process.env.PORT || 8081;
        const server = app.listen(port, function () {
           var host = server.address().address
           var port = server.address().port
           // Handle :: (IPv6 all interfaces) or undefined
           var displayHost = (host === '::' || !host) ? 'localhost' : host
           console.log("case-client-test listening at http://%s:%s", displayHost, port)
        })

        app.get('/', function (_req, res) {
            // return report.html file
            res.sendFile(__dirname + '/report.html');
        });

    } catch (error) {
      console.log("failed to start case-client-test");
      process.exit(1);
    }
}

test().then(() => {
    newman.run({
        collection: require('./postman/collection/Competencies and Academic Standards Exchange (CASE) Service OpenAPI (JSON) Definition.postman_collection.json'),
        reporters: ['htmlextra', 'cli'],
        reporter: { htmlextra: { export: './report.html'} },
        environment: postmanEnvironment,
        verbose: true
    }, function(err, summary) {
        if (err) {
            console.log(err);
        }
        console.log(summary.run.stats);
        console.log('collection run complete! Report at ./report.html');
    });
}).catch(err => {console.log(err);});
