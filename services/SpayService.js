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

  async NameEnquiryIntra({ accountNo, bankcode }) {
    try {
      const requestID = await nanoid();
      console.log({ requestID });
      let requestJson;

      if (bankcode === "000001") {
        requestJson = {
          Referenceid: requestID,
          RequestType: 219,
          Translocation: "web",
          NUBAN: accountNo,
        };
      
      } else {
        requestJson = {
          Referenceid: requestID,
          RequestType: 161,
          Translocation: "web",
          ToAccount: accountNo,
          DestinationBankCode: bankcode,
        };
      }

      console.log({ requestJson });
      const requestbody = await encryptData(
        JSON.stringify(requestJson),
        this.SPAY_BIN,
        this.SPAY_IV
      );
      // console.log({requestbody: typeof requestbody});
      const path = bankcode === "000001" ? "/SBPNameEnquiry" : "/InterbankNameEnquiry"
      const response = await this._axios.post(path, requestbody);
      console.log({ response: response.data.data });
      if (response.data.data.status != "00") {
        return { error: "Inquiry failed" };
      }
      return { data: response?.data.data };
    } catch (err) {
      console.log(err.response.data);
      // console.log(err)
      return { error: err.message };
    }
  }

  async ProcessTransfer({ accountNo, bankcode, amount, reference }) {
    const NEResponse = await this.NameEnquiryIntra({ accountNo, bankcode });
    try {
      const requestID = nanoid();
      console.log({ requestID });
      const requestJson = {
        Referenceid: requestID,
        SessionID: NEResponse.SessionID,
        FromAccount: "0089875279",
        ToAccount: accountNo,
        Amount: amount,
        DestinationBankCode: bankcode,
        NEResponse: JSON.stringify(NEResponse),
        BenefiName: NEResponse.BenefiName,
        PaymentReference: reference,
        RequestType: 162,
        Translocation: "web",
      };

      const requestbody = await encryptData(
        JSON.stringify(requestJson),
        this.SPAY_BIN,
        this.SPAY_IV
      );
      // console.log({requestbody: typeof requestbody});
      const response = await this._axios.post(
        "/InterbankTransferReq",
        requestbody
      );
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
