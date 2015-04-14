import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    willTransition: function(transition) {
      transition.abort();

      console.log("TODO - send transition to main app");
    }
  }
});
