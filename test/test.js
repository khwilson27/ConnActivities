"use strict";
var should = require("chai").should();
var bcrypt = require('bcrypt');
describe("HashPW", function() {
  it("should encrypt password", function() {
    bcrypt.hashSync("myPassword", "$2a$10$ZEkvsHLpyTqrTWcjazMVCu").should.equal("$2a$10$ZEkvsHLpyTqrTWcjazMVCutKsGIEFYdqaIx.BNNCgQnbHEg8hV8ri");
  });
});