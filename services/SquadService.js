const { CURRENCY } = require("../Constants");
const axios = require("axios");
const secretKey = process.env.SQUAD_APIKEY;
const baseURL = process.env.SQUAD_BASEURL;
const db = require("../models");
const Bankcodes = db.MappedBankCodes;
class SquadService {
  constructor() {
    this._axios = axios.create({
      baseURL: baseURL,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
        "cache-control": "no-cache",
      },
    });
  }

  async walletBalance({ currency = CURRENCY.NGN }) {
    try {
      const response = await this._axios.get(
        `/merchant/balance?currency_id=${currency}`
      );
      console.log(response.data);
      if (response.status == 200) {
        return { data: response.data.data.balance };
      }
      return { error: "failed to fetch wallet balance" };
    } catch (error) {
      console.log({ error: error?.message || error?.details });
      return { error: "Failed to fetch balance" };
    }
  }

  async NameEnquiry({ accountNo, bankcode }) {
    try {
      const bank_code = await Bankcodes.findByPk(bankcode);
      const body = { account_number: accountNo, bank_code: bank_code.bankCode };
      console.log({ body });
      const response = await this._axios.post(`/payout/account/lookup`, body);
      console.log(response);
      if (response.status == 200) {
        return { data: response.data?.data };
      }
      return { error: "failed to fetch wallet balance" };
    } catch (err) {
      console.log("sss");
      console.log(err);
      return { error: "Something went wrong" };
    }
  }
}
module.exports = new SquadService();
