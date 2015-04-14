import Ember from 'ember';

export default Ember.Controller.extend({
  navTitle: "Bung",

  actions: {
    setTitle: function(title) {
      this.set('navTitle', title);
    }
  }
});
