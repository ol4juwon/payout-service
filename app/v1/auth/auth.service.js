"use strict";
require('dotenv').config();
const db = require("../../../models/");
const Users = db.Users;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async ({ email, password }) => {
  try {
   
    const user = await Users.scope("password").findOne({ where: { email } });

    if (user) {
      const validPass = await bcrypt.compare(password, user.password);
      if(user.locked){
        user.isLocked = true;
        return { error: "Account Locked", code: 403 };
    }
 
      if (validPass) {
        user.lastLogin = new Date();
        user.retries = 0;
        user.save();
        const token = await generatetoken({
          _id: user.id,
          email: user.email,

          isVerified: user.isVerified,
          role: user.role,
          verificationStatus: user.verificationStatus,
        },process.env.TOKEN_MINUTES);
        const refreshToken = await generatetoken({ _id: user.id,}, process.env.REFRESH_MINUTES)
        return { data: {passwordChanged:user.passwordChanged ,token, refreshToken}, code: 200 };
      } else {
        user.retries += 1;
     
        if(user.retries > 3){
            user.locked = true;
            await user.save();
            return { error: "Account Locked: incorrect password more than 3 time", code: 403 };
        }
        await user.save();
        return { error: "Login failed: incorrect email/password", code: 401 };
      }
    } else {
      return { error: "User doesn't exist", code: 403 };
    }
  } catch (err) {
    // console.log(err.stackTrace)
    return { error: err.message, code: 500 };
  }
};

const generatetoken = async (payload, time) => {
 return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: time || "15m",
  });
};
