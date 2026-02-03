FROM node:20-alpine
RUN apk --no-cache add curl
WORKDIR /usr/src/app
COPY package*.json ./
COPY ./postman ./
RUN npm install --legacy-peer-deps
COPY . .
ENTRYPOINT [ "node", "app.js" ]