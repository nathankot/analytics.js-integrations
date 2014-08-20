
var Analytics = require('analytics.js').constructor;
var integration = require('analytics.js-integration');
var tester = require('analytics.js-integration-tester');
var plugin = require('./');
var sandbox = require('clear-env');

describe('WebEngage', function(){
  var WebEngage = plugin;
  var webengage;
  var analytics;
  var options = {
    licenseCode: '~2024c003'
  };

  beforeEach(function(){
    analytics = new Analytics;
    webengage = new WebEngage(options);
    analytics.use(plugin);
    analytics.use(tester);
    analytics.add(webengage);
  });

  afterEach(function(){
    analytics.restore();
    analytics.reset();
    webengage.reset();
    sandbox();
  });

  it('should store the correct settings', function(){
    analytics.compare(WebEngage, integration('WebEngage')
      .assumesPageview()
      .global('webengage')
      .global('_weq')
      .option('widgetVersion', '4.0')
      .option('licenseCode', ''));
  });

  describe('loading', function(){
    it('should load', function(done){
      analytics.load(webengage, done);
    });
  });
});