FROM node:18.16.0-alpine3.17

WORKDIR /app

COPY package.json ./
RUN npm install --production

COPY src ./src