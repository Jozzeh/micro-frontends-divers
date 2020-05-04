const express = require('express');
const dotenv = require('dotenv');
const result = dotenv.config();
const Podlet = require('@podium/podlet');
const fs = require('fs');

const app = express();

const podlet = new Podlet({
    name: 'sveltePodlet', // required
    version: '0.1.1', // required
    pathname: '/', // required
    development: true, // optional, defaults to false
  });
let svelteassets = fs.readdirSync('public/build');

svelteassets.forEach((element, index) => {
  if(element.indexOf('.css') !== -1 && element.indexOf('.css.map') === -1){
    podlet.css({ value: process.env.PUBLIC_URL + ':' + process.env.PORT + '/' + element });
  }else if(element.indexOf('.js') !== -1 && element.indexOf('.js.map') === -1) {
    podlet.js({ value: process.env.PUBLIC_URL + ':' + process.env.PORT + '/' + element, defer: '' });
  }
}); 

app.use(podlet.middleware());

app.get(podlet.content(), (req, res) => {
  res.status(200).podiumSend('<div id="sveltepod"></div>');
});

app.get(podlet.manifest(), (req, res) => {
  res.status(200).send(podlet);
});

app.use(express.static('public/build'))

app.listen(process.env.PORT);