const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const {Sequelize} = require("sequelize")
const authService = require("../../../app/v1/auth/auth.service");
const {Users} = require("../../../models");

describe("Authentication tests", () => {

  it("login with valid details", async () => {
    const email = "olajuwonlawal2012@gmail.com";
    await authService.login({ email, password: "Olajuwon001" }).then((res) => {
      // console.log(res)
      expect(res).toBeTruthy();
      expect(res.data).toHaveProperty("token");
    //   expect(typeof res.data).toBe('object')
    });
  });
  it("login invalid details", async () => {
    // const id = faker.string.uuid();
    await authService.login({email: "ola@Juwon.mail", password:"sssw"}).then(res => {
        expect(res).toBeTruthy();
        expect(res).toHaveProperty("code", 403)
    })
  });


  it("login correct email wrong  password details", async () => {
    // const id = faker.string.uuid();
    await authService.login({email: "olajuwonlawal20121@gmail.com", password:"sssw"}).then(res => {
        expect(res).toBeTruthy();
        expect(res).toHaveProperty("code", 401)
    })
    await authService.login({email: "olajuwonlawal20121@gmail.com", password:"sssw"}).then(res => {
        expect(res).toBeTruthy();
        expect(res).toHaveProperty("code", 401)
    })
    await authService.login({email: "olajuwonlawal20121@gmail.com", password:"sssw"}).then(res => {
        expect(res).toBeTruthy();
        expect(res).toHaveProperty("code", 401)
    })
    await authService.login({email: "olajuwonlawal20121@gmail.com", password:"sssw"}).then(res => {
        expect(res).toBeTruthy();
        expect(res).toHaveProperty("code", 403)
    })
  });
  it("login to locked account", async () => {
    // const id = faker.string.uuid();
    await authService.login({email: "olajuwonlawal20121@gmail.com", password:"Olajuwon001"}).then(res => {
        expect(res).toBeTruthy();
        expect(res).toHaveProperty("code", 403)
    })
  });
  it("login to with blank password", async () => {
    // const id = faker.string.uuid();
    await authService.login({email: "olajuwonlawal20121@gmail.com", password:""}).then(res => {
        expect(res).toBeTruthy();
        expect(res).toHaveProperty("code", 403)
    })
  });
});
