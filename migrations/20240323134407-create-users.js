"use strict";

const Constants = require('../Constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Users",
      {
        id: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('gen_random_uuid()'),
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false

        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false

        },
        password: {
          type: Sequelize.STRING,
          allowNull: false

        },
        isVerified: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        lastLogin: {
          type: Sequelize.DATE,
        },
        blacklisted: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        locked: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        verificationStatus: {
          type: Sequelize.DataTypes.ENUM("PENDING","PROCESSING","FAILED","SUCCESSFUL","INCOMPLETE"),
          allowNull: false,
          defaultValue: Constants.USER.VERIFICATION_STATUS.PENDING,
        },
        role: {
          type: Sequelize.DataTypes.ENUM("SUPER_ADMIN", "ADMIN", "USER"),
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
