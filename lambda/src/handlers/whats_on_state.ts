'use strict';

import * as AWS from 'aws-sdk';
import { HandlerInput, RequestHandler, ResponseFactory } from 'ask-sdk';
import { RequestEnvelope, Response, ResponseEnvelope } from 'ask-sdk-model';

import { i18n } from './utils/I18N';
import { winston } from './utils/logger';
import { helpers } from './helpers';
import { NtripleClient } from './clients/ntriple-client';
import { Constants } from './utils/constants';

import { JsonClient } from "./clients/json-client";
import { NtripleClient } from './clients/ntriple-client';
import { JsonResponseObject } from "./clients/shared";

const CALENDAR_ENDPOINT: string = 'service.calendar.parliament.uk';
// const NON_SITTING_CATEGORIES: string[] = [
//     'recess',
//     'dissolution'
// ];
// // The order in which we speak events
// const VENUE_ORDER: string[] = [
//     'Main Chamber',
//     'Westminster Hall',
//     'General Committees',
//     'Grand Committees',
//     'Select & Joint Committees'
// ];

// export interface Event {
//   title: string
//   description: string,
//   startTime: number,
//   endTime: number,
//   startDate: number
// }

export async function whatsOnHandler(event: RequestEnvelope, context: any, callback: any, configuration: Configuration = new Configuration()): Promise<ResponseEnvelope> {
  /**
  * HouseIntent - collects a house from the user, and re-calls WhatsOnIntent or re-calls HouseIntent.
  *
  * @function
  */
  const HouseIntent = {
    canHandle(handlerInput: HandlerInput) {
      const request = handlerInput.requestEnvelope.request;

      return request.type === 'IntentRequest' && request.intent.name === 'HouseIntent';
    },

    async handle(handlerInput: HandlerInput) {
      let houseOfInterest: string = null;

      const request = handlerInput.requestEnvelope.request;

      try {
        // TODO: implement getHouseIntentData
        houseOfInterest = helpers.getHouseIntentData(request.intent);

        this.attributes.haveVerifiedHouse = true;
        this.attributes.verifiedHouse = houseOfInterest;
        this.emitWithState('WhatsOnIntent');
      }
      catch(err) {
        winston.error(err);

        if(err.intent) {
          // return this.emit(':ask', `I heard, ${err.intent}. Did you mean, 'commons', 'lords', or, 'both'?`, "Did you mean, 'commons', 'lords', or, 'both'?")
          return handlerInput.responseBuilder
            .speak(i18n.S(request, '.house_intent.repeat_intent'))
            .getResponse();
        } else {
          // return this.emit(':ask', `Did you mean, 'commons', 'lords', or, 'both'?`, "Did you mean, 'commons', 'lords', or, 'both'?")
          return handlerInput.responseBuilder
            .speak(i18n.S(request, '.house_intent.reprompt'))
            .getResponse();

        }
      }
    }
  }

  /**
   * MyMPIntent - sets the skill state to 'START_MODE' and calls the state-specific intent.
   *
   * @function
   */
  const MyMPIntent = {
    canHandle(handlerInput: HandlerInput) {
      const { request } = handlerInput.requestEnvelope;

      return request.type === 'IntentRequest' && request.intent.name === 'MyMPIntent';
    },

    handle(handlerInput: HandlerInput) {
      helpers.logHandler(this.name);
      this.handler.state = Constants.states.StartMode;
      this.emitWithState('MyMPIntent');
    }
  }

  /**
  * WhatsOnIntent - sets the skill state to 'WHATS_ON' and calls the state-specific intent.
  *
  * @param callback
  * @param done
  *
  * @function
  */
  const WhatsOnIntent: RequestHandler = {

    canHandle(handlerInput) {
      //TODO
    }

    async handle(handlerInput: HandlerInput) {
      helpers.logHandler(this.name);

      let houseOfInterest: string = this.attributes.verifiedHouse;

      const jsonClient: JsonClient = new JsonClient(CALENDAR_ENDPOINT, false);
      let calendarDataPath: string = '/calendar/events/list.json?date=30days';

      if(houseOfInterest) {
        calendarDataPath += `&house=${houseOfInterest}`;
      }

      let jsonRequest = await jsonClient.getJSON(calendarDataPath);

      switch(jsonResponse.statusCode) {
        case 200:
          let response = jsonResponse.json;
      }
    }

  }
}
