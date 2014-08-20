
/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var push = require('global-queue')('_uc');

/**
 * Expose `Usercycle` integration.
 */

var Usercycle = module.exports = integration('USERcycle')
  .assumesPageview()
  .global('_uc')
  .option('key', '')
  .tag('<script src="//api.usercycle.com/javascripts/track.js">');

/**
 * Initialize.
 *
 * http://docs.usercycle.com/javascript_api
 *
 * @param {Object} page
 */

Usercycle.prototype.initialize = function(page){
  push('_key', this.options.key);
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Usercycle.prototype.loaded = function(){
  return !! (window._uc && window._uc.push !== Array.prototype.push);
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

Usercycle.prototype.identify = function(identify){
  var traits = identify.traits();
  var id = identify.userId();
  if (id) push('uid', id);
  // there's a special `came_back` event used for retention and traits
  push('action', 'came_back', traits);
};

/**
 * Track.
 *
 * @param {Track} track
 */

Usercycle.prototype.track = function(track){
  push('action', track.event(), track.properties({
    revenue: 'revenue_amount'
  }));
};
