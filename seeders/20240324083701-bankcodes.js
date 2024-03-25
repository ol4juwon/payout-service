'use strict';

const { faker } = require('@faker-js/faker');

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
  //  await queryInterface.bulkInsert('Bankcodes',[
  //   {id: faker.string.uuid(),bank_code:"232" , squad_code: '000001', spay_code: "",bank_name: 'Sterling Bank', createdAt:new Date(), updatedAt:new Date() },
  //   {id: faker.string.uuid(), bank_code:"082",squad_code: '000002',spay_code:"", bank_name: 'Keystone Bank', createdAt: new Date(), updatedAt: new Date() },
  //   {id: faker.string.uuid(),bank_code:"058", squad_code:"000013",spay_code: "",bank_name:"Gtb", createdAt:new Date(), updatedAt: new Date()}
  // ]);
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
