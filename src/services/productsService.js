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
  if (product) {
    return {
      type: null,
      message: product,
    };
  }
  return {
    type: 'NOT_FOUND',
    message: 'Product not found',
  };
}

async function getBySearchQuery(productName) {
  const products = await productsModel.findBySearchQuery(productName);
  return {
    type: null,
    message: products,
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
  const existenceError = await productWasFound(id);
  if (existenceError.message) {
    return existenceError;
  }
  const updatedProduct = await productsModel.updateById(id, newProduct);
  return {
    type: null,
    message: updatedProduct,
  };
}

async function deleteInteraction(id) {
  const existenceError = await productWasFound(id);
  if (existenceError.message) {
    return existenceError;
  }
  await productsModel.deleteById(id);
  return {
    type: null,
    message: 'Deleted successfully',
  };
}

module.exports = {
  getAll,
  getById,
  getBySearchQuery,
  insertNew,
  updateInteraction,
  deleteInteraction,
};
