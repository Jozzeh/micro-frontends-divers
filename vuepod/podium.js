const express = require('express');
const dotenv = require('dotenv');
const result = dotenv.config();
const Podlet = require('@podium/podlet');
const fs = require('fs');

const app = express();

const podlet = new Podlet({
    name: 'vuePodlet', // required
    version: '0.1.0', // required
    pathname: '/', // required
    development: true, // optional, defaults to false
  });

let vueCSS = fs.readdirSync('dist/css');
vueCSS.forEach((element, index) => {
  if(element.indexOf('.css') !== -1 && element.indexOf('.css.map') === -1){
    podlet.css({ value: process.env.PUBLIC_URL + ':' + process.env.PORT + '/css/' + element });
  }
}); 

let vueJS = fs.readdirSync('dist/js');
vueJS.forEach((element, index) => {
  if(element.indexOf('.js') !== -1 && element.indexOf('.js.map') === -1) {
    podlet.js({ value: process.env.PUBLIC_URL + ':' + process.env.PORT + '/js/' + element, defer: '' });
  }
}); 

app.use(podlet.middleware());

app.get(podlet.content(), (req, res) => {
  res.status(200).podiumSend('<div id="vuepod-content"></div>');
});

app.get(podlet.manifest(), (req, res) => {
  res.status(200).send(podlet);
});

app.use('/css', express.static('dist/css'));
app.use('/js', express.static('dist/js'));

app.listen(process.env.PORT);