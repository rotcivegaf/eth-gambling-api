const abiProcessor = require('./abi_processor/main.js');
const processor = require('./processor/main.js');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

abiProcessor();

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => res.send(processor()))
  .listen(PORT, () => console.info(`Listening on ${ PORT }`));
