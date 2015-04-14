import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented, {

  inSupersonic: function() {
    return window.supersonic && window.supersonic.data;
  }.property(),

  viewId: null,

  channel: null,

  isMainChannel: Ember.computed.not('channel'),
  isSideChannel: Ember.computed.not('isMainChannel'),

  publish: function() {
    var channel = this.get('channel') || this.get('mainChannel');
    return channel.publish.apply(this, arguments);
  },

  publishMain: function() {
    var channel = this.get('mainChannel') || this.get('channel');
    return channel.publish.apply(this, arguments);
  },

  setupChannel: function() {
    if (this.get('inSupersonic')) {
      supersonic.logger.debug('setupChannel!');
      var viewId = this.get('viewId'),
          channel = supersonic.data.channel(viewId),
          method;

      if (!viewId) {
        viewId = 'main';
        method = this._gotMainMessage;
        this.set('mainChannel', channel);
      } else {
        console.log("SIDE CHANNEL@@@!!!", viewId);
        method = this._gotSpecificMessage;
        this.set('channel', channel);
        this.get('mainChannel').publish({type: 'init', viewId: viewId});
      }
      supersonic.logger.debug('subscribing', viewId);
      console.log('subscribing@@@@', viewId);
      channel.subscribe(method.bind(this));
    }
  }.observes('viewId').on('init'),


  _gotSpecificMessage: function() {
    supersonic.logger.debug('message on side channel', arguments);
    var triggerParams = this._parseMessage.apply(this, arguments);
    if (triggerParams[0]) {
      this.trigger.apply(this, triggerParams);
    }

  },
  _gotMainMessage: function() {
    var isMainChannel = this.get('isMainChannel');

    if (isMainChannel) {
      supersonic.logger.debug('message on main', arguments);
      var triggerParams = this._parseMessage.apply(this, arguments);
      if (triggerParams[0]) {
        this.trigger.apply(this, triggerParams);
      }
    } else {
      this._gotMessageFromMain.apply(this, arguments);
    }
    // var _this = this;
    // this.get('mainMessageHandlers').forEach(function(handler) {
    //   handler.call(_this, message);
    // });
  },
  _gotMessageFromMain: function() {
    supersonic.logger.debug('message from main on side channel', arguments);
  },
  _parseMessage: function() {
    var message = arguments[0],
        type = message && message.type;

    this.trigger('superMsg', message);
    if (type) {
      type = 'super' + Ember.String.capitalize(type);
      return [type, message];
    }
    return [];
  },


  logMessage: function(message) {
    console.log('RAW!!', message);
  }.on('superMsg'),

  routingMsg: function(message) {
    console.log('routing messsssage');
  }.on('superRouting'),



});

var Message = Ember.Object.extend({
  type: null, // routing, data
  viewId: null,
  msg: null,
});

export { Message };
