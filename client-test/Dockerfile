FROM node:20-alpine
RUN apk --no-cache add curl
WORKDIR /usr/src/app
COPY package*.json ./
COPY ./postman ./
RUN npm install
COPY . .
ENTRYPOINT [ "node", "app.js" ]