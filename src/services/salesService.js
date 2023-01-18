const { salesModel } = require('../models');
const {
  validateSalesPattern,
  validateSaleExists,
  validateReqSoldProducts,
} = require('./validations/salesValidation');

async function registerSales(saleList) {
  const salesPatternError = validateSalesPattern(saleList);
  if (salesPatternError) {
    return salesPatternError;
  }
  const soldProductsError = await validateReqSoldProducts(saleList);
  if (soldProductsError) {
    return soldProductsError;
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
  const saleExistenceError = await validateSaleExists(id);
  if (saleExistenceError) {
    return saleExistenceError;
  }
  await salesModel.deleteById(id);
  return {
    type: null,
    message: 'Deleted successfully',
  };
}

async function updateInteraction(id, updatedSaleList) {
  const saleExistenceError = await validateSaleExists(id);
  if (saleExistenceError) {
    return saleExistenceError;
  }
  const salesPatternError = validateSalesPattern(updatedSaleList);
  if (salesPatternError) {
    return salesPatternError;
  }
  const soldProductsError = await validateReqSoldProducts(updatedSaleList);
  if (soldProductsError) {
    return soldProductsError;
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
