# CASE Client Integration Test

A Node.js application that runs Postman/Newman integration tests for the Competencies and Academic Standards Exchange (CASE) Service API.

## Overview

This project uses [Newman](https://github.com/postmanlabs/newman) (the command-line collection runner for Postman) to execute automated API tests against a CASE service endpoint. Test results are generated as an HTML report accessible via a built-in Express server.

## Features

- Automated API testing using Postman collections
- HTML test report generation with newman-reporter-htmlextra
- Express server to serve test reports
- Docker support for containerized execution
- Configurable CASE service host endpoint

## Prerequisites

- Node.js 20 or later
- npm or yarn

## Installation

```bash
npm install
```

## Configuration

The application can be configured via environment variables:

### CASE_SCHEME

The CASE service host scheme:

- Default: `http`
- Example: `export CASE_SCHEME=https`

### CASE_HOST

The CASE service host endpoint:

- Default: `host.docker.internal` (for Docker environments)
- Example: `export CASE_HOST=your-case-service-host`

### CASE_PORT

The CASE service port:

- Default: `3000`
- Example: `export CASE_PORT=your-case-service-port`

### PORT

The web server port:

- Default: `8081`
- Example: `export PORT=3000`

## Usage

### Run Locally

```bash
node app.js
```

Once running, the test report will be available at:

- http://localhost:8081 (redirects to report.html)
- Or http://localhost:PORT if you set a custom `PORT` environment variable

### Run with Docker

```bash
docker build -t case-client-test .
docker run -p 8081:8081 -e CASE_HOST=your-host:port case-client-test

# With custom port
docker run -p 3000:3000 -e PORT=3000 -e CASE_HOST=your-host:port case-client-test
```

## Project Structure

```
.
├── app.js                      # Main application file
├── package.json                # Node.js dependencies
├── Dockerfile                  # Docker configuration
├── postman/
│   └── collection/
│       └── *.postman_collection.json  # Postman collection files
└── report.html                 # Generated test report (after running tests)
```

## Dependencies

- **express**: Web server for serving test reports
- **newman**: Postman collection runner
- **newman-reporter-htmlextra**: Enhanced HTML report generator
- **uuid**: UUID generation for test environments

## Output

After running the tests:

1. Test statistics are displayed in the console
2. An HTML report is generated at `./report.html`
3. The report is accessible via the Express server at http://localhost:8081
