import 'mocha';
import { expect } from 'chai';
import { constants } from '../../src/utils/constants';

describe("Constants", () => {
  context("app ID", () => {
    it("sets app ID", () => {
      expect(constants.appID).to.not.eq("");
    });

    it("sets DynamoDB table name", () => {
      expect(constants.dynamoDBTableName).to.eq("ParliamentAlexaSkill");
    });

    context("states", () => {
      it("sets start mode", () => {
        expect(constants.state.StartMode).to.eq("");
      });
      it("sets whats on", () => {
        expect(constants.state.WhatsOn).to.eq("_WHATS_ON");
      });
      it("sets streaming", () => {
        expect(constants.state.Streaming).to.eq("_STREAMING");
      })
    });
  });
});
