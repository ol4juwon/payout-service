'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Beneficiaries', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()")
      },
      userId: {
        type: Sequelize.UUID,
        unique: true,
        references: {
          model: 'Users',
          key: 'id' 
        },
      },
      bankcodeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'MappedBankCodes',
          key: 'id' 
        },
      },
      accountNo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      accountName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Beneficiaries');
  }
};