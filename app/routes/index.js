import Ember from 'ember';

export default Ember.Route.extend({
  pubsub: Ember.inject.service('super-pubsub'),

  beforeModel: function() {
    this.get('pubsub');

  },

  actions: {
    conf: function() {
      var options = {
        message: "Please reply honestly, now.",
        buttonLabels: ["Yes", "No"]
      };

      supersonic.ui.dialog.confirm("Are you awesome?", options).then(function(index) {
        if (index == 0) {
          supersonic.logger.log("User is awesome!");
        } else {
          supersonic.logger.log("User wasn't awesome. :(");
        }
      });
    }
  }
});
