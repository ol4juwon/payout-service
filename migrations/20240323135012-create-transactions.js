'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()')
      },
      recipientbankCode: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.DOUBLE
      },
      status: {
        type: Sequelize.ENUM("PENDING","PROCESSING","FAILED","SUCCESSFUL")
      },
      recipientAccountNo: {
        type: Sequelize.STRING
      },
      recipientName: {
        type: Sequelize.STRING
      },
      sender: {
        type: Sequelize.STRING
      },
      channel: {
        type: Sequelize.ENUM("SPAY","SQUAD")
      },
      narration: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id' 
        }
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
    await queryInterface.dropTable('Transactions');
  }
};