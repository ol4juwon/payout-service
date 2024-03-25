"use strict";
const sequelize = require("sequelize");
const db = require("../../../models/");
const Users = db.Users;

/**
 * 
 * @param {*} page 
 * @param {*} limit 
 * @param {*} orderBy 
 * @param {*} sort 
 * @returns Users
 */
exports.getUsers = async (
  page = 1,
  limit = 10,
  orderBy = "createdAt",
  sort = "DESC"
) => {
  try {
    const data = await Users.findAll({
      where: {},
    //   order: sequelize.literal(`createdAt ${sort}`),
      offset: (page-1)* limit,
      limit
    });
    return { data };
  } catch (err) {
    return { error: err.message };
  }
};

/**
 * 
 * @param {*} userId 
 * @returns 
 */
exports.getOneUser = async (userId) => {
    try{
        const data  = await Users.findOne({where:{
            id: userId
        }})
        return {data};
    }catch(err){
    return { error: err.message };
    }
}