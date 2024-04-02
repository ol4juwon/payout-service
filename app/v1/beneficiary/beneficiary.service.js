"use strict";

const { Sequelize } = require("sequelize");
const db = require("../../../models");
const Beneficiaries = db.Beneficiaries;
const MappedBankCodes = db.MappedBankCodes
exports.create = async ({userId,bank_code_id, account_no, account_name}) => {
  try {
    const beneficiary = await Beneficiaries.create({userId,bankcodeId: bank_code_id,accountNo: account_no, accountName:account_name});
    if (beneficiary.error) {
      return { error: beneficiary.error, code: 422 };
    }
    return { data: beneficiary, code: 201 };
  } catch (error) {
    console.log("Errrrrrr", error?.parent?.detail.replace(/["()]/g, ""))
    return { error: error?.parent?.detail.replace(/["()]/g, "") || error?.message || err, code: 500 };
  }
};

exports.getOne = async (id) => {
  try {
    const beneficiary = await Beneficiaries.findByPk(id);
    if (beneficiary == null)
      return { error: "Beneficiary not found", code: 404 };

    return { data: beneficiary, code: 200 };
  } catch (err) {
    return { error: err?.message || err, code: 500 };
  }
};

exports.getAll = async ({
  all,
  limit = 10,
  page = 1,
  orderBy = "createdAt",
  sort = "DESC",
}) => {
  try {
    let beneficiaries;
    if(all){
      beneficiaries = await Beneficiaries.findAll({
        order: Sequelize.literal(`"${orderBy}" ${sort}`),
        include: [
          {
            model: MappedBankCodes,
            attributes: ["id","bankName", "bankCode"],
          },
        ],
      })
    }else{
   beneficiaries = await Beneficiaries.findAll({
      offset: (page - 1) * limit,
      limit,
      order: Sequelize.literal(`"${orderBy}" ${sort}`),
      include: [
        {
          model: MappedBankCodes,
          attributes: ["id","bankName", "bankCode"],
          as: "bank"
        },
      ],
    });
  }
    if (beneficiaries == null)
      return { error: "Beneficiaries not found", code: 404 };

    return { data: beneficiaries, code: 200 };
  } catch (err) {
    return { error: err?.message || err, code: 500 };
  }
};

exports.update = async (id, payload) => {};

exports.delete = async (req, res) => {};
