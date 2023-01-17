const { salesModel } = require('../models');
const { validateSaleList, saleWasFound } = require('./validations/salesValidation');

async function registerSales(saleList) {
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

async function getAll() {
  const saleList = await salesModel.findAll();
  return {
    type: null,
    message: saleList,
  };
}

async function getById(id) {
  const saleList = await salesModel.findById(id);
  const error = saleWasFound(saleList);
  if (error.message) {
    return error;
  }
  return {
    type: null,
    message: saleList,
  };
}

async function deleteInteraction(id) {
  const saleList = await salesModel.findById(id);
  const error = saleWasFound(saleList);
  if (error.message) {
    return error;
  }
  await salesModel.deleteById(id);
  return {
    type: null,
    message: 'Deleted successfully',
  };
}

module.exports = {
  registerSales,
  getAll,
  getById,
  deleteInteraction,
};
