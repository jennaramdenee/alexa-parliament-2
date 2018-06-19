'use strict';

export interface ConstantsData {
  StartMode: string,
  WhatsOn: string,
  Streaming: string
}

export const Constants {
  // App-Id
  let appId: string = 'amzn1.ask.skill.d9431bea-6b44-4cea-b4ff-d4781bd09504';

  // DynamoDB Table name
  let dynamoDBTableName: string 'ParliamentAlexaSkill';

  /*
   *  States:
   *  START_MODE : Welcome state when the skill has started.
   *  WHATS_ON :  When the user has asked whats on and begun down that track
   *  STREAMING : What's
   */
  let states: ConstantsData = {
    StartMode: '',
    WhatsOn: '_WHATS_ON',
    Streaming: '_STREAMING'
  };

}
