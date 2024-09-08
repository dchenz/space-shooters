FROM node:20.16.0-slim AS builder
WORKDIR /opt/app

COPY package.json yarn.lock .
RUN yarn install

COPY public public
COPY src src
COPY webpack.config.js .
RUN NODE_OPTIONS=--openssl-legacy-provider yarn build

FROM httpd:alpine

COPY --from=builder /opt/app/dist /usr/local/apache2/htdocs

EXPOSE 80
