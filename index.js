var Alexa = require('alexa-sdk');

var handlers = {
    'SetHomeAddress': function () {
      var address = this.event.request.intent.slots.Address.value;
      this.emit(':ask', 'Do you want to set ' + address + ' as your home address?')
    },

    'GetNextDeparture': function () {
        this.emit(':tell', 'Hello World!');
    }
};

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers)
    alexa.execute()
};
