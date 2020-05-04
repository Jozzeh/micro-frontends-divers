const express = require('express');
const dotenv = require('dotenv');
const result = dotenv.config();
const Podlet = require('@podium/podlet');
const fs = require('fs');

const app = express();

const podlet = new Podlet({
    name: 'angularPodlet', // required
    version: '0.1.0', // required
    pathname: '/', // required
    development: true, // optional, defaults to false
  });

let angAssets = fs.readdirSync('dist/angularpod');
angAssets.forEach((element, index) => {
  if(element.indexOf('-es5.css') !== -1 && element.indexOf('-es5.css.map') === -1){
    podlet.css({ value: process.env.PUBLIC_URL + ':' + process.env.PORT + '/' + element });
  } else if(element.indexOf('-es5.js') !== -1 && element.indexOf('-es5.js.map') === -1) {
    podlet.js({ value: process.env.PUBLIC_URL + ':' + process.env.PORT + '/' + element, defer: '' });
  }
}); 

app.use(podlet.middleware());

app.get(podlet.content(), (req, res) => {
  res.status(200).podiumSend('<angular-pod></angular-pod>');
});

app.get(podlet.manifest(), (req, res) => {
  res.status(200).send(podlet);
});

app.use(express.static('dist/angularpod'));

app.listen(process.env.PORT);