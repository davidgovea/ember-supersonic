import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  isVirtual: false,
  isVisible: false,

  text: null,
  side: null,
  targetRoute: null,

  clearAfter: false,

  computedSide: Ember.computed('side', function() {
    return this.get('side') === 'right' ? 'right' : 'left';
  }),

  // $navbar: function() {
  //   return $('super-navbar');
  // }.property(),

  // $navButton: function() {
  //   var button = $('<super-navbar-button/>', {
  //     id: this.get('elementId'),
  //     class: this.get('class'),
  //     text: this.get('text')
  //   });
  //   return button;
  // }.property(),

  setup: function() {

    var options = {
      title: this.get('text'),
      side: 'right',
      onTap: () => {
        // TODO keep this comment - leverage ember routing!!
        // supersonic.ui.layers.push("common#settings");
        this.container.lookup('controller:main')
          .transitionToRoute(this.get('targetRoute'));
      },

      // title: options.title;
      // onTap: options.onTap;
      // imagePath: options.imagePath;
      // imageAsOriginal: options.imageAsOriginal;
      // styleClass: options.styleClass;
      // styleId: options.styleId;
      // styleCSS: options.styleCSS;
    };

    var button = new supersonic.ui.NavigationBarButton(options);

    var navbarOpts = {
      buttons: {}
    };
    navbarOpts.buttons[this.get('computedSide')] = [button];

    supersonic.ui.navigationBar.update(navbarOpts);

  }.on('didInsertElement'),

  teardown: function() {
    // this.get('$navbar').find(`#${this.get('elementId')}`).remove();
    if (this.get('clearAfter')) {
      var navbarOpts = {
        title: 'UHHHH',
        buttons: {}
      };
      navbarOpts.buttons[this.get('computedSide')] = null;
      console.log("CLEARING", navbarOpts);
      $('super-navbar-button').remove();
      supersonic.ui.navigationBar.update(navbarOpts)
        .then(function(yay) {
          console.log('yaya', arguments);
        })
        .catch(function(err) {
          console.log('errrrr', err);
        });
    }

  }.on('willDestroyElement')
});
