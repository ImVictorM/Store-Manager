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
  if (saleList.length === 0) {
    return {
      type: 'NOT_FOUND',
      message: 'Sale not found',
    };
  }
  return {
    type: null,
    message: saleList,
  };
}

async function deleteInteraction(id) {
  const error = await saleWasFound(id);
  if (error.message) {
    return error;
  }
  await salesModel.deleteById(id);
  return {
    type: null,
    message: 'Deleted successfully',
  };
}

async function updateInteraction(id, updatedSaleList) {
  const notFoundError = await saleWasFound(id);
  if (notFoundError.message) {
    return notFoundError;
  }
  const badReqError = validateSaleList(updatedSaleList);
  if (badReqError.message) {
    return badReqError;
  }
  const updateResponse = await salesModel.updateById(id, updatedSaleList);
  return {
    type: null,
    message: updateResponse,
  };
}

module.exports = {
  registerSales,
  getAll,
  getById,
  deleteInteraction,
  updateInteraction,
};
