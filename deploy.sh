#! /bin/bash

node deploy.js
pm2 stop chorus-app;
pm2 stop chorus-app-websocket;
pm2 start pm2.json --env development;