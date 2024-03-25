"use strict";

const { USER } = require("../Constants");
const db = require("../models");
const Users = db.Users;
const { faker } = require('@faker-js/faker');
const bcrypt = require("bcryptjs");
module.exports = async () => {
  await seedService();
};

let seedService = async () => {
  try {
    const admin = await Users.findOne({
      where: { role: USER.ROLES.SUPER_ADMIN },
    });
    if (!admin) {
      console.log("no admin user");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("Olajuwon001", salt);
      const newadmin = new Users({
        id: faker.string.uuid(),
        firstName: "Ola",
        lastName: "Juwon",
        role: USER.ROLES.SUPER_ADMIN,
        password: hashedPassword,
        email: "olajuwonlawal2012@gmail.com",
        isVerified: true,
        blacklisted: false,
        locked: false,
      });
      await newadmin.save();
    } else {
    //   console.log("admin", { admin });
    }
  } catch (err) {
    console.log(err.message);
  }
};
