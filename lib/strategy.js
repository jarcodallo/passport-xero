/**
 * Module dependencies.
 */
var util = require('util'),
  Oauth1Strategy = require('../lib/passport-oauth1'); // SPECIAL OAUTH PATCHED TO READ IN A KEY AND SECRET

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
