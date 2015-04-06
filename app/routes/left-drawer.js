import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    closeDrawer: function() {
      supersonic.ui.drawers.close();
    }
  }
});
