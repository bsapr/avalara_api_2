process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../");
let should = chai.should();
var mocha = require("mocha");
var describe = mocha.describe;
var assert = chai.assert;
chai.use(chaiHttp);

const expect = chai.expect;

// Unit testing for POST request
describe("POST /set", () => {
  it("post set should return status 200", async () => {
    let key = "key_CHAI1";
    let value = "value_CHAI1";
    let res = await chai
      .request(server)
      .post("/set")
      .send("key=" + key + "&value=" + value);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal(
      "Write operation has been done successfully"
    );
  });
});

//Unit testing for READ request
describe("GET /read", () => {
  it("Get should return status 200", async () => {
    let key = "key_CHAI1";
    let value = "value_CHAI1";
    let res = await chai.request(server).get("/read/:key3");

    expect(res.status).to.equal(200);
    expect(res.body.data.value).to.equal("value");
  });
});
