'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
    
      */
       await queryInterface.bulkInsert('Providers', [{
        id:  '8ecc79ce-2762-4525-9187-b8ed56624a2c',
         name: 'SquadCo',
         slug:'squad',
         value: "squad",
         bankcode: "000013",
         active: true, 
         createdBy: "8ecc79ce-2762-4525-9187-b8ed56624a2c",
         isDefault: true,
         description: "Squad payment provider",
         createdAt:new Date(),
         updatedAt: new Date()
       }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Providers', null, {});

  }
};
