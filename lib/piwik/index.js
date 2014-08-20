
/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var push = require('global-queue')('_paq');
var each = require('each');

/**
 * Expose `Piwik` integration.
 */

var Piwik = module.exports = integration('Piwik')
  .global('_paq')
  .option('url', null)
  .option('siteId', '')
  .mapping('goals')
  .tag('<script src="{{ url }}/piwik.js">');

/**
 * Initialize.
 *
 * http://piwik.org/docs/javascript-tracking/#toc-asynchronous-tracking
 */

Piwik.prototype.initialize = function(){
  window._paq = window._paq || [];
  push('setSiteId', this.options.siteId);
  push('setTrackerUrl', this.options.url + '/piwik.php');
  push('enableLinkTracking');
  this.load(this.ready);
};

/**
 * Check if Piwik is loaded
 */

Piwik.prototype.loaded = function(){
  return !! (window._paq && window._paq.push != [].push);
};

/**
 * Page
 *
 * @param {Page} page
 */

Piwik.prototype.page = function(page){
  push('trackPageView');
};

/**
 * Track.
 *
 * @param {Track} track
 */

Piwik.prototype.track = function(track){
  var goals = this.goals(track.event());
  var revenue = track.revenue() || 0;
  each(goals, function(goal){
    push('trackGoal', goal, revenue);
  });
};
