const processor = require('./processor/processor.js');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

processor();

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => res.send(console.log('bla')))
  .listen(PORT, () => console.info(`Listening on ${ PORT }`));
