const { productsModel } = require('../models');
const { productWasFound, productIsValid } = require('./validations/productsValidation');

async function getAll() {
  const allProducts = await productsModel.findAll();
  return {
    type: null,
    message: allProducts,
  };
}

async function getById(id) {
  const product = await productsModel.findById(id);
  const error = productWasFound(product);
  if (error.message) {
    return error;
  }
  return {
    type: null,
    message: product,
  };
}

async function insertNew(product) {
  const error = productIsValid(product);
  if (error.message) {
    return error;
  }
  const createdProduct = await productsModel.createNew(product);
  return {
    type: null,
    message: createdProduct,
  };
}

async function updateInteraction(id, newProduct) {
  const validationError = productIsValid(newProduct);
  if (validationError.message) {
    return validationError;
  }
  const productQuery = await productsModel.findById(id);
  const existenceError = productWasFound(productQuery);
  if (existenceError.message) {
    return existenceError;
  }
  const updatedProduct = await productsModel.updateById(id, newProduct);
  return {
    type: null,
    message: updatedProduct,
  };
}

module.exports = {
  getAll,
  getById,
  insertNew,
  updateInteraction,
};
