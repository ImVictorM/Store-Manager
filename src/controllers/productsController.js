const { productsService } = require('../services');

async function receiveProducts(_req, res) {
  const { type, message } = await productsService.getAll();
  if (!type) {
    return res.status(200).json(message);
  }
}

module.exports = {
  receiveProducts,
};
