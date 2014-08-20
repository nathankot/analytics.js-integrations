
/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');

/**
 * Expose `PerfectAudience` integration.
 */

var PerfectAudience = module.exports = integration('Perfect Audience')
  .assumesPageview()
  .global('_pa')
  .option('siteId', '')
  .tag('<script src="//tag.perfectaudience.com/serve/{{ siteId }}.js">');

/**
 * Initialize.
 *
 * https://www.perfectaudience.com/docs#javascript_api_autoopen
 *
 * @param {Object} page
 */

PerfectAudience.prototype.initialize = function(page){
  window._pa = window._pa || {};
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

PerfectAudience.prototype.loaded = function(){
  return !! (window._pa && window._pa.track);
};

/**
 * Track.
 *
 * @param {Track} event
 */

PerfectAudience.prototype.track = function(track){
  window._pa.track(track.event(), track.properties());
};
