import Ember from 'ember';
import { Message } from 'ember-app/services/super-pubsub';

export default Ember.Mixin.create({
  pubsub: Ember.inject.service('super-pubsub'),

  viewId: null,

  _broadcastTransition: function() {
    supersonic.logger.debug('sending transition ' + JSON.stringify(transition));
    var message = Message.create({
      type: 'routing',
      transition: transition
    });

    this.get('pubsub').publishMain(message);

  },

  beforeModel: function() {
    console.log('super route!!!!');
    this.get('pubsub').set('viewId', this.get('viewId'));

    return this._super.apply(this, arguments);
  },
  actions: {
    willTransition: function(transition) {
      var target = transition.targetName,
          isNested = target.indexOf(this.routeName) >= 0;

      if (!isNested) {
        console.log('route stopped', transition, this);
        transition.abort();
      }
      console.log('transition...', transition);
      this._broadcastTransition(target);
    }
  }
});
