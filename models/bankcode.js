'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bankcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bankcode.belongsToMany(models.Beneficiaries,{through:"Beneficiaries_Bankcodes"})
    }
  }
  Bankcode.init({
    bankName: DataTypes.STRING,
    bankCode: DataTypes.STRING,
    spayCode: DataTypes.STRING,
    squadCode: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bankcodes',
  });
  return Bankcode;
};