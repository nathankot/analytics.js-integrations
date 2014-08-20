
/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var is = require('is');
var noop = function(){};
var onBody = require('on-body');

/**
 * Expose `Awesomatic` integration.
 */

var Awesomatic = module.exports = integration('Awesomatic')
  .assumesPageview()
  .global('Awesomatic')
  .global('AwesomaticSettings')
  .global('AwsmSetup')
  .global('AwsmTmp')
  .option('appId', '')
  .tag('<script src="https://1c817b7a15b6941337c0-dff9b5f4adb7ba28259631e99c3f3691.ssl.cf2.rackcdn.com/gen/embed.js">');

/**
 * Initialize.
 *
 * @param {Object} page
 */

Awesomatic.prototype.initialize = function(page){
  var self = this;
  var user = this.analytics.user();
  var id = user.id();
  var options = user.traits();

  options.appId = this.options.appId;
  if (id) options.user_id = id;

  this.load(function(){
    window.Awesomatic.initialize(options, function(){
      self.ready(); // need to wait for initialize to callback
    });
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Awesomatic.prototype.loaded = function(){
  return is.object(window.Awesomatic);
};
