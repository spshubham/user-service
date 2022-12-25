"use strict";
var Response = require("../utils/response");
const validate = require("../utils/validation")
const Userdb = require("../db/user.db")

exports.signUp = async function (body) {
  try {
    let valid = validate.isValidRegisterUserBody(body);
    if (!valid.isValid) {
      throw valid.payload;
    }
    
    await Userdb.create(body);
    return {
      message: "User Registered Successfully"
    };
  } catch (error) {
    console.log(error);
    if (error.code) throw error
    else throw Response.UnexpectedError;
  }
};


exports.getDetails = async function (email, password) {
  try {

    if (!email || !password) {
      throw Response.InvalidReqBody
    }

    const user = await Userdb.findByEmailAndPassord(email, password);

    if (user == null) {
      throw Response.InvalidUserAndMail;
    }

    return user;
  } catch (error) {
    if (error.code) throw error
    throw Response.UnexpectedError;

  }
};
