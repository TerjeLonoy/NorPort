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

    'AskHomeAddress': function () {
      var address = this.attributes["homeAddress"]

      if (!address) {
        this.emit(':tell', 'No home address is set')
      } else {
        this.emit(':tell', address + ' is set as your home address')
      }
    },

    'AMAZON.YesIntent': function() {
        if (state == states.SETTING_ADDRESS_STATE) {
          state = ""
          this.attributes["homeAddress"] = askParams.address
          this.emit(':tell', askParams.address + ' is now set as your home address')
        }
    },

    'AMAZON.NoIntent': function () {
        if (state == states.SETTING_ADDRESS_STATE) {
          this.emit(':tell', 'A home address needs to be set in order to know where you are travelling from')
          state = ""
        }
    },

    'SessionEndedRequest': function () {
        console.log('session ended!');
        this.emit(':saveState', true);
    },

    'Unhandled': function() {
        var message = "Welcome to NorPort, you can ask me for any public transport departures, but first you must set a home address."
        this.emit(':tell', message);
    }
};

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context)
    alexa.appId = 'amzn1.ask.skill.3458de80-f334-42e6-806c-833b0241ef92'
    alexa.dynamoDBTableName = 'NorPort'
    alexa.registerHandlers(handlers)
    alexa.execute()
};
