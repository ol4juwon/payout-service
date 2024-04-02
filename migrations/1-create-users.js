"use strict";

const Constants = require("../Constants");

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
          defaultValue: Sequelize.literal("gen_random_uuid()"),
        },
        retries: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
          validate: {
            isEmail: {
              msg: "Provide a valid email",
            },
          },
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        isVerified: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          validate: {
            isBoolean: {
              msg: "Can only be a boolean",
            },
          },
        },
        lastLogin: {
          type: Sequelize.DATE,
        },
        blacklisted: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        passwordChanged: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        locked: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        active: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        verificationStatus: {
          type: Sequelize.DataTypes.ENUM(
            "PENDING",
            "PROCESSING",
            "FAILED",
            "SUCCESSFUL",
            "INCOMPLETE"
          ),
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
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
