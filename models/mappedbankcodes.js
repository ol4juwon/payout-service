'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MappedBankCodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // MappedBankCodes.hasMany(models.SquadBankCodes)
      MappedBankCodes.hasMany(models.Beneficiaries,{foreignKey:"bankcodeId"})
      MappedBankCodes.belongsTo(models.SpayBankCodes, {foreignKey: "spayBankCodeId", as:"Spay", allowNull: true});
      MappedBankCodes.belongsTo(models.SquadBankCodes, {foreignKey: "squadBankCodeId", as:"Squad", allowNull: true});

    }
  }
  MappedBankCodes.init({
    bankCode: DataTypes.STRING,
    bankName: DataTypes.STRING,
    squadBankCodeId: DataTypes.UUID,
    spayBankCodeId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'MappedBankCodes',
  });
  return MappedBankCodes;
};