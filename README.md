# ts-node-wp-bolierplate

A Node.js - Typescript production ready bolierplate with webpack, eslint and prettier, which can help to initiate any node-typescript app quickly.

add 127.0.0.1 host.docker.internal in /etc/hosts file, this is required for mongodb

## Sample .env

SERVER_PORT=5050
DATABASE_URL=mongodb://127.0.0.1:27017/evento
ACCESS_TOKEN_SECRET=someaccesstokensecret
ACCESS_TOKEN_EXPIRES=1h
REFRESH_TOKEN_SECRET=somerefreshtokensecret
REFRESH_TOKEN_EXPIRES=30d
