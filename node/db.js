var online = require('online');
var redis = require('redis');
var db = redis.createClient();


module.exports = online;
