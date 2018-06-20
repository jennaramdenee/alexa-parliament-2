'use strict';

import * as AWS from 'aws-sdk';
import { HandlerInput, RequestHandler, ResponseFactory, SkillBuilders } from 'ask-sdk';
import { RequestEnvelope, Response, ResponseEnvelope } from 'ask-sdk-model';

import { winston } from './utils/logger';
import { moment } from 'moment';


const NONSITTING_CATEGORIES: string[] = [
    'recess',
    'dissolution'
];
// The order in which we speak events
const VENUE_ORDER: string[] = [
    'Main Chamber',
    'Westminster Hall',
    'General Committees',
    'Grand Committees',
    'Select & Joint Committees'
];

export interface DataObject {
  count: number,
  nonsitting: {
    [key: string]: NonSittingEventObject
  },
  events: {
    [key: string] EventObject
  },
  future: {
  }
}


export interface NonSittingEventObject {
  end: null,
  description: null,
  recess: boolean,
  dissolution: boolean,
  other: boolean
}

export interface EventObject {
  count: number,
  starts: null,
  venues: ??
}

export interface FutureEventObject {
  date: null,
  count: number,
  events: {
    [key: string] EventObject
  }
}

export interface VenueObject {
  name: string,
  count: number,
  events: Event[]
}

export interface Event {
  title: string
  description: string,
  startTime: number,
  endTime: number,
  startDate: number
}

export function EventsProcessor(jsonResponse: any): EventsData {
  switch(jsonResponse.statusCode) {
    case 200:
      let response = jsonResponse.json;
      let today = moment().format("YYYY-MM-DD");


  }
}

function findTodaysEvents(jsonResponse: any) {
  let todaysEvents = jsonResponse.filter(event => splitDate(event['StartDate']) == today);
  return todaysEvents;
}

function findFutureEvents(jsonResponse: any) {
  let futureEvents = jsonResponse.filter(event => splitDate(event['StartDate']) > today);
  return futureEvents;
}

async function houseSitting(): boolean {
  let nonsittingJsonResponse = await jsonClient.getJSON('/calendar/events/nonsitting.json?date=today');
  return !nonsittingJsonResponse.json;
}

function splitDate(date: string): string {
  return date.split("T")[0];
}
