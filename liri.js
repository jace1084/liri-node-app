
require("dotenv").config();

var keys = require('./keys.js');
var request = require('request');
// var twitter = require('twitter');
var spotify = require('spotify');
// var client = new twitter(keys.twitterKeys);
var fs = require('fs');

var nodeArgv = process.argv;
var command = process.argv[2];
//movie or song
var x = "";
//attaches multiple word arguments
for (var i=3; i<nodeArgv.length; i++){
  if(i>3 && i<nodeArgv.length){
    x = x + "+" + nodeArgv[i];
  } else{
    x = x + nodeArgv[i];
  }
}