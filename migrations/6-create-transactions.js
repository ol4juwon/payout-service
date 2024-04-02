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
      beneficiary:{
        type: Sequelize.UUID,
        references: {
          model: 'Beneficiaries',
          key: 'id' 
        },
        validate:{
          isUUID:{
            msg:"must be a valid bankcode uuid"
          }
        }
      }
     ,
      amount: {
        type: Sequelize.DOUBLE
      },
      status: {
        type: Sequelize.ENUM("PENDING","PROCESSING","FAILED","SUCCESSFUL"),
        allowNull: false,
      },
      senderId: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id' 
        },
        validate:{
          isUUID:{
            msg:"must be a valid user uuid"
          }
        }
      },
      provider: {
        type: Sequelize.UUID,
        allowNull:false,
        references: {
          model: 'Providers',
          key: 'id' 
        },
        validate:{
          isUUID:{
            msg:"must be a valid provider uuid"
          }
        }
      },
      narration: {
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
    },{
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};