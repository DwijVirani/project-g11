const driverModel = require('./../models/driver');

const loginService = async (username, password) => {
  try {
    const result = await driverModel.findOne({ username, password });
    if (result) {
      return result;
    }
    return undefined;
  } catch (error) {
    throw error;
  }
};

const getUserByUsername = async (username) => {
  try {
    const userData = await driverModel.findOne({ username });
    if (userData) {
      return userData;
    }
    return undefined;
  } catch (error) {
    throw error;
  }
};

const registerService = async (payload) => {
  try {
    const result = await driverModel.create(payload);
    if (result) {
      return result;
    }
    return undefined;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  loginService,
  getUserByUsername,
  registerService,
};
