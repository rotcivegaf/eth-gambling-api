const cool = require('cool-ascii-faces')
const test = require('./example.js')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .get('/test', (req, res) => res.send(test.getTx()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
