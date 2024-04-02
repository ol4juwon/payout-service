'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transactions.belongsTo(models.Users, { foreignKey: 'senderId' });
      Transactions.belongsTo(models.Beneficiaries, {foreignKey: 'beneficiary'})
      Transactions.belongsTo(models.Providers, {foreignKey: 'provider'})
    }
  }
  Transactions.init({
    beneficiary: DataTypes.UUID,
    amount: DataTypes.DOUBLE,
    status: DataTypes.ENUM("PENDING","PROCESSING","FAILED","SUCCESSFUL"),
    senderId:DataTypes.UUID,
    provider: DataTypes.UUID,
    narration: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  return Transactions;
};