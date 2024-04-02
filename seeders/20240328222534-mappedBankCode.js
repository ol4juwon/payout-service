"use strict";
const db = require("../models");
const SquadBankCodes = db.SquadBankCodes;
const SpayBankCodes = db.SpayBankCodes;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const sterlingData = await SpayBankCodes.findAll();
    const gtbData = await SquadBankCodes.findAll();
console.log(sterlingData.length);
console.log(gtbData.length);
    const combinedData = [];

    sterlingData.forEach((sterling) => {
      combinedData.push({
        bankCode: sterling.bankCode,
        spayBankCodeId: sterling.id,
        bankName: sterling.bankName,
        squadBankCodeId: null, // Set to null as gtbId is not available
      });
    });

    gtbData.forEach((gtb) => {
      const existingEntry = combinedData.find(
        (data) => data.bankCode === gtb.bankCode
      );
      if (existingEntry) {
        existingEntry.squadBankCodeId = gtb.id;
      } else {
        combinedData.push({
          bankCode: gtb.bankCode,
          bankName: gtb.bankName,

          spayBankCodeId: null, // Set to null as sterlingId is not available
          squadBankCodeId: gtb.id,
        });
      }
    });

    await queryInterface.bulkInsert("MappedBankCodes", combinedData);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("MappedBankCodes", null, {});
  },
};
