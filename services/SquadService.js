const { CURRENCY, TRANSACTION } = require("../Constants");
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
      console.log(response.data);
      if (response.status == 200) {
        return { data: response.data?.data };
      }
      return { error: "failed to do name enquiry" };
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong" };
    }
  }

  async ProcessTransfer({
    narration,
    bank_code,
    bankCode,
    currency_id = "NGN",
    amount,
    accountNo,
    reference,
  }) {
    try {
      //do name enquiry
      const { error, data } = await this.NameEnquiry({
        accountNo,
        bankcode: bank_code,
      });
      if (error) {
        return { error: error, code: 400 };
      }
      const reuqestData = {
        bank_code: bankCode,
        amount,
        remark: narration,
        currency_id,
        transaction_reference: reference,
        account_name: data.account_name,
        account_number: data.account_number
      };
      const response = await this._axios.post(`/payout/transfer`, reuqestData);
      if (response.status === 200) {
        return { data: response.data, code: 200 };
      } else if (response.status === 424) {
        return { error: "process requery", code: 424 };
      } else {
        return { error: "Failed", code: 400 };
      }
    } catch (err) {
      // console.log(err.response);
      return { error: "Something went wrong" };
    }
  }
}
module.exports = new SquadService();
