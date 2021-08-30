const { expect } = require("chai");
const sinon = require("sinon");
const sleep = require("sleep-promise");
const { createToken } = require("../../dist/index.js");

describe("createToken", function() {
    it("creates a token", function() {
        const token = createToken();
        expect(token).to.have.property("cancel").that.is.a("function");
    });

    describe("using a cancel token", function() {
        beforeEach(function() {
            this.token = createToken();
        });

        it("is initially not cancelled", function() {
            expect(this.token.isCancelled()).to.be.false;
        });

        it("cancels immediately", function() {
            this.token.cancel();
            expect(this.token.isCancelled()).to.be.true;
        });

        it("emits an event when cancelled", function() {
            const spy = sinon.spy();
            this.token.onCancel(spy);
            this.token.cancel();
            expect(spy.callCount).to.equal(1);
        });

        it("emits an event when listening after cancellation", async function() {
            this.token.cancel();
            const spy = sinon.spy();
            this.token.onCancel(spy);
            await sleep(100);
            expect(spy.callCount).to.equal(1);
        });

        it("can throw if cancelled", function() {
            this.token.cancel();
            expect(() => this.token.throwIfCancelled()).to.throw(/Token was cancelled/i);
        });

        it("can throw with a custom message", function() {
            this.token.cancel();
            expect(() => this.token.throwIfCancelled("Custom")).to.throw(/Custom/i);
        });
    });
});
