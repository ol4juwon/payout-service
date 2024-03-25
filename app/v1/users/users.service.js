"use strict";
const { Sequelize } = require("sequelize");
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
  dir = "DESC"
) => {
  try {
    const data = await Users.findAll({
      offset: (page-1)* limit,
      limit,
      order: Sequelize.literal(`${orderBy} ${dir}`)
    });
    return { data , code: 200};
  } catch (err) {
    return { error: err.message, code:500 };
  }
};

/**
 * 
 * @param {*} userId 
 * @returns ERROR|DATA
 */
exports.getOneUser = async (userId) => {
    try{
        const data  = await Users.findByPk(userId
        )
        if(data == null){
          return {error: "not found", code: 404}
        }
        return {data, code: 200};
    }catch(err){
    return { error: err.message, code: 500 };
    }
}