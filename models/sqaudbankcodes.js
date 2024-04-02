'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SqaudBankCodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // SqaudBankCodes.belongsTo(models.MappedBankCodes, {foreignKey: 'squadBankCodeId'})
    }
  }
  SqaudBankCodes.init({
    bankCode: DataTypes.STRING,
    bankName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SquadBankCodes',
  });
  return SqaudBankCodes;
};