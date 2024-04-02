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
      Users.hasMany(models.Transactions, {foreignKey:"senderId", as: "transactions"});
      Users.hasOne(models.Beneficiaries, {foreignKey: "userId", as:"beneficiary"});
      Users.hasOne(models.Wallets, {foreignKey: "userId", as:"wallet"});
      Users.hasMany(models.Providers,{ foreignKey:"createdBy", as:"providersCreated"})
    }
  }
  Users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    active: DataTypes.BOOLEAN,
    verificationStatus:DataTypes.ENUM("PENDING","PROCESSING","FAILED","SUCCESSFUL","INCOMPLETE"),
    lastLogin: DataTypes.DATE,
    blacklisted: DataTypes.BOOLEAN,
    passwordChanged: DataTypes.BOOLEAN,
    locked: DataTypes.BOOLEAN,
    retries: DataTypes.INTEGER,
    role:DataTypes.ENUM("SUPER_ADMIN","ADMIN","USER"),

  }, {
    sequelize,
    modelName: 'Users',
    defaultScope: {
      attributes: {
        exclude: ['password']
      },
    },
      scopes:{
        password:{
          attributes:{include: "password"}
        }
      }
    
  });
  return Users;
};