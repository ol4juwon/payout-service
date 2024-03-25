'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Transactions, { foreignKey: 'userId' });
    }
  }
  Users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    verificationStatus:DataTypes.ENUM("PENDING","PROCESSING","FAILED","SUCCESSFUL","INCOMPLETE"),
    lastLogin: DataTypes.DATE,
    blacklisted: DataTypes.BOOLEAN,
    locked: DataTypes.BOOLEAN,
    retries: DataTypes.INTEGER,
    role:DataTypes.ENUM("SUPER_ADMIN","ADMIN","USER")

  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};