"use strict";
require("dotenv").config({});
const SpayService = require("../services/SpayService")
// require("../app/helpers")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    const tableName = "SpayBankCodes";

      const spayServiceBankCode = await SpayService.getBankCodes();
      const transformedData = spayServiceBankCode.data.map(row => `('${row.BANKNAME}', '${row.BANKCODE}', CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`).join(',')
 
      const query = `
      INSERT INTO "${tableName}" ("bankName", "bankCode", "createdAt", "updatedAt")
      VALUES ${transformedData}
      ON CONFLICT ("bankCode") DO NOTHING;
    `;

    await queryInterface.sequelize.query(query);

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
      await queryInterface.bulkDelete('SpayBankCodes', null, {});

  },
};
