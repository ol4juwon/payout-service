"use strict";
const db = require("../models/");
const Users = db.Users;
const { ROLES, USER } = require("../Constants");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("Olajuwon001", salt);
    const user1 = "8ecc79ce-2762-4525-9187-b8ed56624a2c";
    const user2 = "b97f39df-2e43-4a70-8590-b7cbdb179ff6";
    console.log({user2})
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: user1,
          firstName: "Ola",
          lastName: "Juwon",
          role: USER.ROLES.ADMIN,
          password: hashedPassword,
          email: "olajuwonlawal2012@gmail.com",
          isVerified: true,
          active: true,
          passwordChanged: true,
          blacklisted: false,
          locked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: user2,
          firstName: "Ola",
          lastName: "Juwon",
          role: USER.ROLES.USER,
          passwordChanged: true,
          password: hashedPassword,
          email: "olajuwonlawal20121@gmail.com",
          isVerified: true,
          active:false,
          blacklisted: false,
          locked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert("Wallets", [
      {
        userId: user1,
        balance: 0.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: user2,
        balance: 0.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
