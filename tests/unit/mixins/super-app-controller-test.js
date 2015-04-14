import Ember from 'ember';
import SuperAppControllerMixin from '../../../mixins/super-app-controller';
import { module, test } from 'qunit';

module('SuperAppControllerMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var SuperAppControllerObject = Ember.Object.extend(SuperAppControllerMixin);
  var subject = SuperAppControllerObject.create();
  assert.ok(subject);
});
