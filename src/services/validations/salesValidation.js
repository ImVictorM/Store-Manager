const { salesSchema: { salePattern } } = require('../../schemas');
const { productsModel, salesModel } = require('../../models');

async function validateSaleExists(id) {
  const saleList = await salesModel.findById(id);
  if (saleList.length === 0) {
    return {
      type: 'NOT_FOUND',
      message: 'Sale not found',
    };
  }
  return false;
}

function validateSalesPattern(saleList) {
  let errorMessage = null;
  const salesAreValid = saleList.every((sale) => {
    const { error = false } = salePattern.validate(sale);
    errorMessage = error.message;
    return !error;
  });
  if (!salesAreValid) {
    return {
      type: 'UNPROCESSABLE_ENTITY',
      message: errorMessage,
    };
  }

  return false;
}

async function validateReqSoldProducts(saleList) {
  const productsExist = await Promise.all(saleList.map(async (sale) => {
    const { productId } = sale;
    const productQuery = await productsModel.findById(productId);
    const productExists = typeof productQuery === 'object';
    return productExists;
  }));
  const invalidRequest = productsExist.some((productExists) => productExists === false);
  if (invalidRequest) {
    return {
      type: 'NOT_FOUND',
      message: 'Product not found',
    };
  }
  return false;
}

module.exports = {
  validateReqSoldProducts,
  validateSalesPattern,
  validateSaleExists,
};
