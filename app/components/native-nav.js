import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  isVirtual: true,

  title: null,

  $superNav: Ember.computed(function() {
    return $('super-navbar-title');
  }),

  titleObserver: function() {
    var title = this.get('title');
    console.log('whut title', title);

    this.get('$superNav').text(title);

  }.on('init').observes('title'),

  lol: function() {
    window.ass = this;
  }.on('init')
});
