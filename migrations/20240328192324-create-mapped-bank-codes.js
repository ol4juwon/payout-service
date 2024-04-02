'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MappedBankCodes', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()")
        
      },
      bankCode: {
        type: Sequelize.STRING,
        unique:true,
      },
      bankName: {
        type: Sequelize.STRING
      },
      squadBankCodeId: {
        type: Sequelize.UUID,
        references: {
          model: 'SquadBankCodes',
          key: 'id' 
        },
      },
      spayBankCodeId: {
        type: Sequelize.UUID,
        references: {
          model: 'SpayBankCodes',
          key: 'id' 
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MappedBankCodes');
  }
};