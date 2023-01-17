const { productsModel } = require('../models');
const { productIsValid } = require('./validations/productsValidation');

async function getAll() {
  const allProducts = await productsModel.findAll();
  return {
    type: null,
    message: allProducts,
  };
}

async function getById(id) {
  const product = await productsModel.findById(id);
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
  const error = productIsValid(newProduct);
    if (error.message) {
    return error;
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
