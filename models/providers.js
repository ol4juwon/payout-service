'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Providers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Providers.belongsTo(models.Users, {foreignKey: 'createdBy',})
    }
  }
  Providers.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    bankcode: DataTypes.STRING,
    isDefault: DataTypes.BOOLEAN,
    createdBy: DataTypes.UUID,
    description: DataTypes.STRING,
    value: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Providers',
  });
  return Providers;
};