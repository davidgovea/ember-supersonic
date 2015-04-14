import Ember from 'ember';
import SuperRouteMixin from 'ember-app/mixins/super-route';

export default Ember.Route.extend(SuperRouteMixin, {
  viewId: 'leftDrawer',
  actions: {
    closeDrawer: function() {
      supersonic.ui.drawers.close();
    }
  }
});
