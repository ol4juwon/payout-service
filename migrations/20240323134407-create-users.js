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
        },
        lastName: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
        },
        isVerified: {
          type: Sequelize.BOOLEAN,
        },
        lastLogin: {
          type: Sequelize.DATE,
        },
        blacklisted: {
          type: Sequelize.BOOLEAN,
        },
        locked: {
          type: Sequelize.BOOLEAN,
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
