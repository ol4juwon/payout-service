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
    }
  }
  Bankcode.init({
    bank_name: DataTypes.STRING,
    bank_code: DataTypes.STRING,
    spay_code: DataTypes.STRING,
    squad_code: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bankcode',
  });
  return Bankcode;
};