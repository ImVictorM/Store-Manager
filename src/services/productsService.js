const { productsModel } = require('../models');
const { productWasFound } = require('./validations/productsValidation');

async function getAll() {
  const allProducts = await productsModel.findAll();
  return {
    type: null,
    message: allProducts,
  };
}

async function getById(id) {
  const product = await productsModel.findById(id);
  const { message } = productWasFound(product);
  if (message) {
    return {
      type: 'NOT_FOUND',
      message,
    };
  }
  return {
    type: null,
    message: product,
  };
}

module.exports = {
  getAll,
  getById,
};
