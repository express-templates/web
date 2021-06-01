const request = require("supertest");

const app = require("../app");

describe("GET /", () => {
  it("responds with a json message", (done) => {
    request(app)
      .get("/")
      .expect(200, {
        message: "Hello express"
      }, done);
  });
});
