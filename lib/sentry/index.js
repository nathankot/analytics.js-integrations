
/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var is = require('is');

/**
 * Expose `Sentry` integration.
 */

var Sentry = module.exports = integration('Sentry')
  .global('Raven')
  .option('config', '')
  .tag('<script src="//cdn.ravenjs.com/1.1.10/native/raven.min.js">');

/**
 * Initialize.
 *
 * http://raven-js.readthedocs.org/en/latest/config/index.html
 */

Sentry.prototype.initialize = function(){
  var config = this.options.config;
  var self = this;
  this.load(function(){
    // for now, raven basically requires `install` to be called
    // https://github.com/getsentry/raven-js/blob/master/src/raven.js#L113
    window.Raven.config(config).install();
    self.ready();
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Sentry.prototype.loaded = function(){
  return is.object(window.Raven);
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

Sentry.prototype.identify = function(identify){
  window.Raven.setUser(identify.traits());
};
