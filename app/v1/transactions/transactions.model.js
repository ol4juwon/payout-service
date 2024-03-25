'use strict';
const {
  Model
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
    }
  }
  Transactions.init({
    status: DataTypes.ENUM("PENDING","PROCESSING","FAILED","SUCCESSFUL"),
    recipientBank: DataTypes.STRING,
    recipientAccount: DataTypes.STRING,
    bankCode: DataTypes.STRING,
    amount: DataTypes.DOUBLE,
    sender: DataTypes.STRING,
    narration: DataTypes.STRING,
    channel: DataTypes.ENUM("SPAY","SQUAD")
  }, {
    sequelize,
    schema:"core",
    modelName: 'Transactions',
  });
  return Transactions;
};