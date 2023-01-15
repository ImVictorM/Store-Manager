const { salesModel } = require('../models');
const { validateSaleList } = require('./validations/salesValidation');

async function registerSale(saleList) {
  const error = validateSaleList(saleList);
  if (error.message) {
    return error;
  }
  const registerResponse = await salesModel.createSoldProducts(saleList);
  return {
    type: null,
    message: registerResponse,
  };
}

module.exports = {
  registerSale,
};
