"use strict";
const { Sequelize } = require("sequelize");
const db = require("../../../models/");
const Wallets  = db.Wallets
const Users = db.Users
exports.getAlWallet = async({page=1, limit = 10,orderBy ='createdAt', sort ="desc"}) => {
    const data = await Wallets.findAll({
        offset: (page - 1) * limit,
        limit,
        order: Sequelize.literal(`"${orderBy}" ${sort}`),
        include: [
          {
            model: Users,
           attributes: ['id', 'firstName','lastName', 'email']
          }
        ],
      });
      if(data) return {data, code: 200}
}

exports.getWalletDetails = async(id) => {
  try{
    console.log({id})
  const data = await Wallets.findByPk(id,{
      include: [
        {
          model: Users,
         attributes: ['id', 'firstName','lastName', 'email']
        }
      ],
    });

    if(data == null) {
      return {error: "Wallet not found", code: 404}
    }
    if(data) return {data: data, code: 200}
  }catch(err){
    return {error: err, code: 500}
  }

}

exports.fundWallet = async({id, amount}) => {
  console.log({id, amount})
  const wallet = await Wallets.findOne({where: {userId: id}});
  if(!wallet) return {error: "wallet not found", code: 404}
  wallet.balance += amount;
  await wallet.save();
    if(wallet) return {data: wallet, code: 200}
}

exports.debitWallet = async({page=1, limit = 10,orderBy ='createdAt', sort ="desc"}) => {
  const data = await Wallets.findAll({
      offset: (page - 1) * limit,
      limit,
      order: Sequelize.literal(`"${orderBy}" ${sort}`),
      include: [
        {
          model: Users,
         attributes: ['id', 'firstName','lastName', 'email']
        }
      ],
    });
    if(data) return {data, code: 200}
}