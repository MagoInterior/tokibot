const fetch = require('node-fetch')
const imgbb = require('imgbb-uploader')
const axios = require('axios')
const cfonts = require('cfonts')
const spin = require('spinnies')
const Crypto = require('crypto')


const GetHours = function() {
  var date = new Date();
  var horas = date.getHours();
  horas = (horas < 10 ? "0": "") + horas;
  var min = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;
  var seg = date.getSeconds();
  seg = (seg < 10 ? "0" : "") + seg;
  
  return horas + ":" + min + ":" + seg;
};

module.exports = { GetHours }
