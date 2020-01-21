'use strict';

var express = require('express');
var Redis = require('ioredis');

const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

var redis = new Redis({
  password: REDIS_PASSWORD,
  tls: {
    port: REDIS_PORT, 
    host: REDIS_HOST  
  }
});

const app = express();
app.use(express.json());

async function setKey(key, value) {
  console.log('setting ' + key + ' to ' + value);
  await redis.set(key, value);
}

async function getKey(key) {
  let value = await redis.get(key);
  console.log('Got value ' + value + ' for key ' + key);
  return value;
}

app.get('/get/:key', async (req, res) => {
  let key = req.params.key;
  let value = await getKey(key);
  res.status(200).json({
    key: key,
    value: value
  });
})

app.post('/set', async (req, res) => {
  let key = req.body.key;
  let value = req.body.value;
  await setKey(key, value);
  res.status(200).json({
    message: 'success!'
  })
});



module.exports = app;