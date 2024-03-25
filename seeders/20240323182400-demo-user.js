'use strict';
const db = require("../models/");
const Users = db.Users;
const { ROLES, USER } = require('../Constants');
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
   await queryInterface.bulkInsert('Users', [
    {

    // id: faker.string.uuid(),
    firstName:"Ola",
    lastName:"Juwon",
    role:USER.ROLES.ADMIN,
    password:hashedPassword ,
    email: "olajuwonlawal2012@gmail.com",
    isVerified:true,
    blacklisted: false, 
    locked:false,
    createdAt: new Date(),
    updatedAt: new Date()
   },
   {

    // id: faker.string.uuid(),
    firstName:"Ola",
    lastName:"Juwon",
    role:USER.ROLES.USER,
    password:hashedPassword ,
    email: "olajuwonlawal20121@gmail.com",
    isVerified:true,
    blacklisted: false, 
    locked:false,
    createdAt: new Date(),
    updatedAt: new Date()
   }
  ], {
    schema:"core"
  })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
