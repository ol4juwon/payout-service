// "use strict";
const { Sequelize } = require("sequelize");
const { sequelize } = require("../../../models/index");
const db = require("../../../models/");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const nanoid = require("nanoid");
const { USER } = require("../../../Constants");
const Users = db.Users;
const Wallet = db.Wallets;
const Provider = db.Providers;
const Beneficiary = db.Beneficiaries;
const Transaction = db.Transactions;
const MappedBankCodes = db.MappedBankCodes;
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
    const { count, rows } = await Users.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
      order: Sequelize.literal(`"${orderBy}" ${sort}`),
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Provider,
          as: "providersCreated",
          attributes: ["id", "name", "slug"],
        },
        {
          model: Beneficiary,
          as: "beneficiary",
          attributes: ["id", "accountNo"],
        },
        { model: Wallet, as: "wallet", attributes: ["balance"] },
        { model: Transaction, as: "transactions" },
      ],
    });
    const pageCount = Math.ceil(count / limit);
    const data = { total: count, pages: pageCount, data: rows };
    return { data, code: 200 };
  } catch (err) {
    console.log("Err", err.message);
    return { error: err.message, code: 500 };
  }
};

/**
 *
 * @param {*} userId
 * @returns ERROR|DATA
 */
exports.getOneUser = async (userId) => {
  try {
    const data = await Users.findByPk(userId, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Provider,
          as: "providersCreated",
          attributes: ["id", "name", "slug"],
        },
        {
          model: Beneficiary,
          as: "beneficiary",
          attributes: ["id", "accountNo", "bankcodeId", "accountName"],
          include: [
            {
              model: MappedBankCodes,
              attributes: ["bankName"],
            },
          ],
        },
        { model: Wallet, as: "wallet", attributes: ["balance"] },
        {
          model: Transaction,
          as: "transactions",
          include: [
            {
              model: Beneficiary,
            },
          ],
        },
      ],
    });
    if (data == null) {
      return { error: "User not found", code: 404 };
    }
    return { data, code: 200 };
  } catch (err) {
    return { error: err.message, code: 500 };
  }
};

exports.createUser = async ({ email, firstName, lastName, role }) => {
  try {
    const exisitngUser = await Users.findOne({ where: { email } });
    if (exisitngUser) {
      return { error: `user with email ${email} already exists`, code: 400 };
    }
    const rsult = await sequelize.transaction(async (t) => {
      const password = nanoid.customAlphabet("wasdcvgbbgt345566432@£", 10)();
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const user = await Users.create(
        {
          email,
          firstName,
          lastName,
          password: hashedPassword,
          isVerified: false,
          role: USER.ROLES[role],
          locked: false,
          blacklisted: false,
        },
        { transaction: t }
      );
      const walletUser = await Wallet.create(
        { userId: user.id },
        { transaction: t }
      );
      let x = {};
      x.user = user;
      x.user = { ...x.user.dataValues, wallet: walletUser };
      delete x.user.password;
      return { data: x.user, code: 201 };
    });
    if (rsult.data) {
      return { data: rsult.data, code: rsult.code };
    }
    return {error:"failed", code: 400}
  } catch (err) {
    return {
      error: err?.parent?.message || err?.message,
      code: err?.parent?.message ? 422 : 400,
    };
  }
};
/**
 *
 * @param {uuid} id
 */
exports.blacklistUser = async (id) => {
  try {
    const userExists = await Users.findByPk(id);
    if (userExists) {
      userExists.blacklisted = true;
      userExists.save();
      return { data: "blacklisted", code: 200 };
    }
    return { error: "user not found", code: 404 };
  } catch (error) {
    return { error: error.message, code: 400 };
  }
};

exports.toggleUser = async (id, toggle) => {
  try {
    const userExists = await Users.findByPk(id);
    if (userExists) {
      userExists.active = toggle;
      const user = await userExists.save();
      return { data: user, code: 200 };
    }
    return { error: "user not found", code: 404 };
  } catch (error) {
    return { error: error?.message, code: 400 };
  }
};
