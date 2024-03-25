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
      // Transactions.belongsTo(models.Users, { foreignKey: 'userId' });
    }
  }
  Transactions.init({
    recipientbankCode: DataTypes.STRING,
    amount: DataTypes.DOUBLE,
    status: DataTypes.ENUM("PENDING","PROCESSING","FAILED","SUCCESSFUL"),
    recipientAccountNo: DataTypes.STRING,
    recipientName: DataTypes.STRING,
    sender: DataTypes.STRING,
    userId:DataTypes.STRING,
    channel: DataTypes.ENUM("SPAY","SQUAD"),
    narration: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  return Transactions;
};