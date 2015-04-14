import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    this.controllerFor('settings').send('setTitle', 'LOL SETTINGZ');
  }
});
