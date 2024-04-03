"use strict";
require("dotenv").config({});
const axios = require("axios");
const { customAlphabet } = require("nanoid");
const { binaryToAscii, encryptData } = require("../app/helpers");
const nanoid = customAlphabet("1234567890", 14);

const appId = process.env.SPAY_APPID;
const baseURl = process.env.SPAY_BASEURL;
const key = process.env.SPAY_KEY;
const iv = process.env.SPAY_IV;

class SpayService {
  constructor() {
    this._axios = axios.create({
      baseURL: baseURl,
      headers: {
        accept: "application/json",
        AppId: `${appId}`,
        "Content-Type": "text/plain",
        "cache-control": "no-cache",
      },
    });
    this.SPAY_BIN = binaryToAscii(key);
    this.SPAY_IV = binaryToAscii(iv);
  }

  async getBalance() {
    try {
    //   const requestID = await nanoid();
    // //   console.log({ requestID });
    //   const requestJson = {
    //     Referenceid: requestID,
    //     RequestType: 151,
    //     Translocation: "web",
    //     NUBAN: "0089875279",
    //   };

    //   const requestbody = await encryptData(
    //     JSON.stringify(requestJson),
    //     this.SPAY_BIN,
    //     this.SPAY_IV
    //   );
      // console.log({requestbody: typeof requestbody});
    //   const response = await this._axios.post("/BalanceEnquiry", requestbody);
      // console.log({response: response.data});

      return { data: 1000 };
    } catch (err) {
      console.log(err.message);
      console.log(err);
      return { error: "errrrr" };
    }
  }
  async getBankCodes() {
    try {
      const requestID = await nanoid();
      console.log({ requestID });
      const requestJson = {
        Referenceid: requestID,
        RequestType: 152,
        Translocation: "web",
      };

      const requestbody = await encryptData(
        JSON.stringify(requestJson),
        this.SPAY_BIN,
        this.SPAY_IV
      );
      // console.log({requestbody: typeof requestbody});
      const response = await this._axios.post("/GetBankListReq", requestbody);
      // console.log({response: response.data});

      return { data: JSON.parse(response?.data?.data.response) };
    } catch (err) {
      console.log(err.message);
      console.log(err);
      return { error: "errrrr" };
    }
  }

  async NameEnquiryIntra({ accountNo }) {
    try {
      const requestID = await nanoid();
      console.log({ requestID });
      const requestJson = {
        Referenceid: requestID,
        RequestType: 219,
        Translocation: "web",
        NUBAN: accountNo,
      };

      const requestbody = await encryptData(
        JSON.stringify(requestJson),
        this.SPAY_BIN,
        this.SPAY_IV
      );
      // console.log({requestbody: typeof requestbody});
      const response = await this._axios.post("/SBPNameEnquiry", requestbody);
      // console.log({response: response.data});

      return { data: JSON.parse(response?.data?.data.response) };
    } catch (err) {
      console.log(err.message);
      // console.log(err)
      return { error: "errrrr" };
    }
  }
}
module.exports = new SpayService();
