/* global require, module */
var Funnel = require('broccoli-funnel');


var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  fingerprint: {
    exclude: ['native-styles'],
  }
});

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.
app.import('bower_components/supersonic/css/supersonic.css');
app.import('bower_components/steroids-js/steroids.js');
app.import('bower_components/supersonic/supersonic.core.js');

var extraAssets = new Funnel('bower_components/supersonic', {
  srcDir: '/',
  include: ['components/*', 'css/*', 'fonts/*', 'supersonic.core.js'],
  destDir: '/supersonic'
});

var webComponentsTree = new Funnel('bower_components/webcomponentsjs/', {
  include: ['webcomponents.js'],
  destDir: '/assets'
});

module.exports = app.toTree([extraAssets, webComponentsTree]);
