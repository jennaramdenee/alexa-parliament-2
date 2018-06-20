"use strict";

import { winston } from './utils/logger';

// What values are we expecting to receive for houses
const EXPECTED_HOUSE_VALUES: string[] = [
    'parliament',
    'commons',
    'lords',
    'both'
];
// Which values are equivalent to no house being passed
const DISCARDED_HOUSE_VALUES: string[] = [
    'parliament',
    'both'
];

export function Helpers = {
  /**
  * Log an intent name - useful for debugging and assessing applicaion flow.
  *
  * @param {string} name the name of an intent
  *
  * @example
  * const helpers = require("./parliament/helpers");
  * helpers.logHandler("Intent Name");
  *
  * @function
  */
  const logHandler(name: string) {
    winston.info("Intent: " + name);
  }

  /**
  * Given an alexa-sdk event's request, get the house slot, if it is present.
  *
  * This method is used to get the name of a specific house that a user has requested events for.
  *
  * @example
  * // With the sample utterance 'Alexa, ask Parliament what's on at the House of Commons'
  * // This method should return 'commons' when run inside of the WhatsOnIntent
  * const helpers = require("./lib/parliament/helpers");
  * let houseOfInterest = helpers.getHouseIntentData(this.event.request.intent);
  *
  * @param {object} intent an alexa-sdk intent object
  * @returns {(string|null)} either the intent value or null
  *
  * @function
  */
  const getHouseIntentData(intent) {
    let houseDataFilled = intent && intent.slots && intent.slots.house && intent.slots.house.value;
    let house_data = null;

    if(houseDataFilled) {
      let temp = intent.slots.house.value.toLowerCase();
      temp = temp.replace(/'/g, '');

      if(EXPECTED_HOUSE_VALUES.includes(temp)) {
        if(!DISCARDED_HOUSE_VALUES.includes(temp)) { house_data = temp; }
      } else {
        let error = new Error(`Slot value '${temp}' was not one of: ${EXPECTED_HOUSE_VALUES}`);
        error.intent = temp;
        throw error
      }
    }

    return house_data;
  }
}
