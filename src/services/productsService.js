const { productsModel } = require('../models');

async function getAll() {
  const allProducts = await productsModel.findAll();
  return {
    type: null,
    message: allProducts,
  };
}

module.exports = {
  getAll,
};
