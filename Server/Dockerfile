FROM node:16.13.1-alpine

WORKDIR /home/app

COPY package.json /var/www/html/server
COPY yarn.lock /var/www/html/server

RUN yarn

COPY . /home/app

RUN yarn run build
RUN node /home/app/dist/app.js