'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wallet.belongsTo(models.Users, {foreignKey: 'userId'})
    }
  }
  Wallet.init({
    userId: DataTypes.UUID,
    balance: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Wallets',
  });
  return Wallet;
};