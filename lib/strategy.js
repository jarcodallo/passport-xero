/**
 * Module dependencies.
 */
var util = require('util'),
  Oauth1Strategy = require('passport-oauth1'),
  PatchedOauth = require('../node_modules/passport-oauth1/node_modules/oauth').OAuth,
  fs = require('fs'),
  http= require('http'),
  https= require('https');

PatchedOauth.prototype._createClient= function( port, hostname, method, path, headers, sslEnabled ) {
  console.log('We are using the monkey patch');
  var options = {
    host: hostname,
    port: port,
    path: path,
    method: method,
    headers: headers,
    key: fs.readFileSync('/Users/joeycozza/entrust-private-nopass.pem', 'utf8'),
    cert: fs.readFileSync('/Users/joeycozza/entrust-cert2.pem', 'utf8')
  };
  var httpModel;
  if( sslEnabled ) {
    httpModel= https;
  } else {
    httpModel= http;
  }
  return httpModel.request(options);
}

function Strategy(options, verify) {
  options = options || {};
  options.requestTokenURL = 'https://api-partner.network.xero.com/oauth/RequestToken';
  options.accessTokenURL = 'https://api-partner.network.xero.com/oauth/AccessToken';
  options.userAuthorizationURL = 'https://api.xero.com/oauth/Authorize';

  Oauth1Strategy.call(this, options, verify);

  this.name = 'xero';
}

util.inherits(Strategy, Oauth1Strategy);

module.exports = Strategy;