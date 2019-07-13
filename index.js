const abiProcessor = require('./abi_processor/main.js');
const processor = require('./processor/main.js');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

abiProcessor();

const redis = require('redis');
const client = redis.createClient(18522, 'redis-18522.c16.us-east-1-2.ec2.cloud.redislabs.com', {no_ready_check: true});

client.auth('e4cUZUzXfoT3ePWprVLWZBydeeqvkH0u', function (err) {
  if (err) throw err;
});

client.on('connect', function() {
  console.log('Connected to Redis');
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => res.send(processor()))
  .listen(PORT, () => console.info(`Listening on ${ PORT }`));
