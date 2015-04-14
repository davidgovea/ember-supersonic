import Ember from 'ember';

export default Ember.Mixin.create({
  pubsub: Ember.inject.service('super-pubsub'),

  setupChannel: function() {
    if (this.get('pubsub.inSupersonic')) {
      this.set('currentRouteName', null);
      this.get('pubsub')
    }
  }.on('init')
});
