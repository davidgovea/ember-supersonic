import Ember from 'ember';

export default Ember.Service.extend({

  inSupersonic: function() {
    return window.supersonic && window.supersonic.data;
  }.property(),

  viewId: null,


  isMain: true,
  channel: null,

  publish: function() {
    var channel = this.get('channel') || this.get('mainChannel');
    return channel.publish.apply(this, arguments);
  },
  subscribe: function(handler) {
    var hasSpecificChannel = !!this.get('channel'),
        listProperty;

    if (hasSpecificChannel) {
      listProperty = 'messageHandlers';
    } else {
      listProperty = 'mainMessageHandlers';
    }

    this.get(listProperty).pushObject(handler);

  },

  setupChannel: function() {
    if (this.get('inSupersonic')) {
      var viewId = this.get('viewId'),
          channel = supersonic.data.channel(viewId),
          method;

      if (!viewId) {
        viewId = 'main';
        method = this._gotMainMessage;
        this.set('mainChannel', channel);
      } else {
        this.set('isMain', false);
        method = this._gotSpecificMessage;
        this.set('channel', channel);
      }
      channel.subscribe(method.bind(this));
    }
  }.observes('viewId').on('init'),

  messageHandlers: function() {
    return [
      function(message) {
        console.log('message received', message);
      }
    ];
  }.property(),
  mainMessageHandlers: function() {
    return [
      function(message) {
        console.log('main channel message', message);
      }
    ];
  }.property(),

  activeHandlerList:[],

  _gotSpecificMessage: function(message) {
    var _this = this;
    this.get('messageHandlers').forEach(function(handler) {
      handler.call(_this, message);
    });
  },
  _gotMainMessage: function() {
    var _this = this;
    this.get('mainMessageHandlers').forEach(function(handler) {
      handler.call(_this, message);
    });
  }
});
