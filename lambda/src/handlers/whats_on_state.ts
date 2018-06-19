'use strict';

import * as AWS from 'aws-sdk';
import { HandlerInput, RequestHandler, ResponseFactory, SkillBuilders } from 'ask-sdk';
import { RequestEnvelope, Response, ResponseEnvelope } from 'ask-sdk-model';

import { i18n } from './utils/I18N';
import { winston } from './utils/logger';
import { NtripleClient } from './clients/ntriple-client';
import { Constants } from './utils/constants';

import { JsonClient } from "./clients/json-client";
import { NtripleClient } from './clients/ntriple-client';
import { JsonResponseObject } from "./clients/shared";

let calendarEndpoint: string = 'service.calendar.parliament.uk';
let nonSittingCategories: Array<string> = [
    'recess',
    'dissolution'
];
// The order in which we speak events
let venueOrder: Array<string> = [
    'Main Chamber',
    'Westminster Hall',
    'General Committees',
    'Grand Committees',
    'Select & Joint Committees'
];

export interface Event {
  title: string
  description: string,
  startTime: number,
  endTime: number
}

/**
 * HouseIntent - collects a house from the user, and re-calls WhatsOnIntent or re-calls HouseIntent.
 *
 * @function
 */
export function HouseIntent {
  let houseOfInterest = null;
  try {
    // TODO: implement getHouseIntentData
    houseOfInterest = helpers.getHouseIntentData(this.event.request.intent);

    this.attributes.haveVerifiedHouse = true;
    this.attributes.verifiedHouse = houseOfInterest;
    this.emitWithState('WhatsOnIntent');
  } catch(err) {
    winston.error(err);

    if(err.intent) {
      return this.emit(':ask', `I heard, ${err.intent}. Did you mean, 'commons', 'lords', or, 'both'?`, "Did you mean, 'commons', 'lords', or, 'both'?")
    } else {
      return this.emit(':ask', `Did you mean, 'commons', 'lords', or, 'both'?`, "Did you mean, 'commons', 'lords', or, 'both'?")
    }
  }
}

export function MyMPIntent {
  // need to implement helpers for logHandler
  // helpers.logHandler(this.name);
  this.handler.state = Constants.states.StartMode;
  this.emitWithState('MyMPIntent');
}

export function LaunchRequest {
  //TODO: implement
}

export function Unhandled {
  //TODO: Implement
}

/**
 * WhatsOnIntent - sets the skill state to 'WHATS_ON' and calls the state-specific intent.
 *
 * @param callback
 * @param done
 *
 * @function
 */
export function WhatsOnIntent {
  // need to implement
  // helpers.logHandler(this.name);
  let houseOfInterest: string = null;
}
