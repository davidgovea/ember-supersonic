import Ember from 'ember';
import SuperRouteMixin from '../../../mixins/super-route';
import { module, test } from 'qunit';

module('SuperRouteMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var SuperRouteObject = Ember.Object.extend(SuperRouteMixin);
  var subject = SuperRouteObject.create();
  assert.ok(subject);
});
