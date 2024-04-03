"use strict";
const { faker } = require("@faker-js/faker");
const bankCodeService = require("../../../app/v1/bankcode/bankcode.service")
describe("Bankcode tests", () => {
  let newID ;
  beforeAll(async () => {});

//   it("create bank code test", () => {});

  it("Get all bank code test", async () => {
    await bankCodeService.getBankCodes({all: true, page:1, limit:10, orderBy:"bankCode", sort:"DESC"}).then(res =>{
        expect(res).toHaveProperty("data")
    })
  });
  it("Get bank code test", async () => {
    await bankCodeService.getBankCodes({all: false, page:1, limit:10, orderBy:"bankCode", sort:"DESC"}).then(res =>{
        expect(res).toHaveProperty("data")
        newID = res.data[0]
        console.log({newID})
    })
  });

  it("Get all bank code test invalid params", async () => {
    await bankCodeService.getBankCodes({all: true, page:1, limit:10, orderBy:"43433", sort:"DESC"}).then(res =>{
        expect(res).toHaveProperty("error")
    })
  });

  it("Get Bankcode details invalid uuid", async () => {
    await bankCodeService.getOneBankCode("100019").then(res =>{
        expect(res).toHaveProperty("error")
        expect(res.code).toBe(400);
    })
  });

  it("Get Bankcode details valid uuid, nonexistent banckcode", async () => {
    const id = faker.string.uuid();
    await bankCodeService.getOneBankCode(id).then(res =>{
      console.log({res})
        expect(res).toHaveProperty("error")
        expect(res.code).toBe(404);
    })
  });

  it("Get Bankcode details valid uuid", async () => {
    await bankCodeService.getOneBankCode(newID.id).then(res =>{
      console.log({res})
        expect(res).toHaveProperty("data")
        expect(res.code).toBe(200);
    })
  });
  

  afterAll(async () => {});
});
