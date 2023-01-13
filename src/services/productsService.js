const { productsModel } = require('../models');

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

module.exports = {
  getAll,
  getById,
};
