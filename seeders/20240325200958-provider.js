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
        id:  'ad795f13-7b56-4933-8b6d-ac9da2db4b40',
         name: 'SquadCo',
         slug:'squad',
         value: "squad",
         active: true, 
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
