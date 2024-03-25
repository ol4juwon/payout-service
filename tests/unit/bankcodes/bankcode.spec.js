"use strict";
const bankCodeService = require("../../../app/v1/bankcode/bankcode.service")
describe("Bankcode tests", () => {
  beforeAll(async () => {});

//   it("create bank code test", () => {});

  it("Get all bank code test", async () => {
    await bankCodeService.getBankCodes().then(res =>{
        expect(res).toHaveProperty("data")
    })
  });

  it("Validate bank code test", async () => {
    await bankCodeService.getOneBankCode().then(res =>{
        expect(res).toHaveProperty("data")
        expect(typeof res.data).toBe("object");
    })
  });

  afterAll(async () => {});
});
