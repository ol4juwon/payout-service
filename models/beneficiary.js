'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Beneficiary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Beneficiary.belongsTo(models.Users, {foreignKey: 'userId'})
      Beneficiary.belongsTo(models.MappedBankCodes, {foreignKey: "bankcodeId"})


    }
  }
  Beneficiary.init({
    userId: DataTypes.UUID,
    bankcodeId: DataTypes.UUID,
    accountNo: DataTypes.STRING,
    accountName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Beneficiaries',
  });
  return Beneficiary;
};