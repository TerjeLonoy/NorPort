var Alexa = require('alexa-sdk');

const states = {
  SETTING_ADDRESS_STATE: "_SETTING_ADDRESS"
}

var state = ""
var askParams = {}

var handlers = {
    'SetHomeAddress': function () {
      var address = this.event.request.intent.slots.Address.value
      state = states.SETTING_ADDRESS_STATE
      askParams.address = address
      this.emit(':ask', address + ' will be set as your home address, is that correct?', 'say yes to verify or no to cancel')
    },

    'AMAZON.YesIntent': function() {
        if (state == states.SETTING_ADDRESS_STATE) {
          this.emit(':tell', askParams.address + ' is now set as your home address')
          state = ""
        }
    },

    'AMAZON.NoIntent': function () {
        if (state == states.SETTING_ADDRESS_STATE) {
          this.emit(':tell', 'A home address needs to be set in order to know where you are travelling from')
          state = ""
        }
    },

    'Unhandled': function() {
        this.emit(':tell', 'Set a home address plix');
    }
};

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context)
    alexa.registerHandlers(handlers)
    alexa.execute()
};
