/**
 * Module dependencies.
 */
var util = require('util'),
  Oauth1Strategy = require('passport-oauth1'),
  PatchedOauth = require(__dirname + '/../node_modules/passport-oauth1/node_modules/oauth').OAuth,
  fs = require('fs'),
  http= require('http'),
  https= require('https');


//In order for us (Grow) to connect to Xero through the partner application, we need to sign our
// request with a key and certificate
PatchedOauth.prototype._createClient= function( port, hostname, method, path, headers, sslEnabled ) {
  var options = {
    host: hostname,
    port: port,
    path: path,
    method: method,
    headers: headers,
    key: fs.readFileSync(process.cwd() + '/server/dataSources/Xero/certificates/entrust-private-nopass.pem', 'utf8'),
    cert: fs.readFileSync(process.cwd() + '/server/dataSources/Xero/certificates/entrust-cert2.pem', 'utf8')
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