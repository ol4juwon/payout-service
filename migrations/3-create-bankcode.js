'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bankcodes', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue:Sequelize.literal('gen_random_uuid()')
      },
      bank_name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      bank_code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      spay_code: {
        type: Sequelize.STRING
      },
      squad_code: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },{
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bankcodes');
  }
};