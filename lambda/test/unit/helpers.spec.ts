import 'mocha';
import { expect } from 'chai';
import { helpers } from '../../src/helpers';

describe("Helpers", () => {
  describe("logHandler", () => {
    it("logs intent name", () => {
      expect(helpers.logHandler("test")).to.eq("Intent: test");
    });
  });

  describe("getHouseIntentData", function(){
    context("with intent data", function(){
      context("with allowed intent data", function(){
        context("with parliament or both", function(){
          it("returns null", function(){
            let intent;

            intent = { slots: { house: { value: "parliament" } } };
            expect(helpers.getHouseIntentData(intent)).to.equal(null);


            intent = { slots: { house: { value: "both" } } };
            expect(helpers.getHouseIntentData(intent)).to.equal(null);
          });
        });

        context("with a house", function(){
          it("returns as expected", function(){
            let intent = { slots: { house: { value: "commons" } } };
            expect(helpers.getHouseIntentData(intent)).to.equal("commons");
          });

          describe("strips apostrophies", function(){
            it("returns as expected", function(){
              let intent = { slots: { house: { value: "common's" } } };
              expect(helpers.getHouseIntentData(intent)).to.equal("commons");
            });
          })
        })
      });

      context("with invalid intent data", function(){
        it("raises an error", function(){
          let intent = { slots: { house: { value: "foo" } } };
          let raised_error = false

          try {
            helpers.getHouseIntentData(intent)
          } catch(error) {
            raised_error = true
            expect(error.message).to.equal('Slot value \'foo\' was not one of: parliament,commons,lords,both');
            expect(error.intent).to.equal("foo")
          }
          expect(raised_error).to.equal(true)
        });
      })
    });

    context("without intent data", function(){
      it("returns null", function(){
        let intent = {};

        expect(helpers.getHouseIntentData(intent)).to.equal(null);
      });
    });
  });
});
