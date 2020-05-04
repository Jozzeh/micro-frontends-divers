const express = require('express');
const Podlet = require('@podium/podlet');
const dotenv = require('dotenv');
const result = dotenv.config();

const app = express();

const podlet = new Podlet({
    name: 'htmlBusPodlet', // required
    version: '1.0.0', // required
    pathname: '/', // required
    manifest: '/manifest.json', // optional, defaults to '/manifest.json'
    development: true, // optional, defaults to false
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  return next();
});


app.use(podlet.middleware());

podlet.js({ value: process.env.PUBLIC_URL + ':' + process.env.PORT + '/bushandle.js', type: 'module' });

app.get(podlet.content(), (req, res) => {
  res.status(200).podiumSend(`
      <p style="font-size: 11px; color: #333;">Message received in plain HTML: <span id="htmlbus-message"></span></p>
      `);
});

app.get(podlet.manifest(), (req, res) => {
  res.status(200).send(podlet);
});

app.use(express.static('assets'));
app.use('/node_modules', express.static('node_modules'));

app.listen(7104);