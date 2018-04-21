import supertest from "supertest";
import chai from "chai";

const should = chai.should();
const request = supertest;

import app from "./../server/app";

describe("GET /", function() {
    it("should 200", function(done) {
        request(app.listen())
            .get("/")
            .set("Accept", "application/text")
            .expect("Content-Type", /text/)
            .end(function(err, res) {
                if (err) {
                    throw new Error(err);
                }

                // console.log(res)
                res.status.should.equal(200);

                // console.log(res.text)
                res.text.should.equal("home");
                done();
            });
    });
});
