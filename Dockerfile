FROM node:8

LABEL maintainer "August (Chris) <ohlookitsaugust@gmail.com>"

WORKDIR /usr/src/Yui

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN [ "node", "src/Yui.js" ]