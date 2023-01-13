const { productsService } = require('../services');
const { mapError } = require('../utils/errorMap');

async function receiveAll(_req, res) {
  const { type, message } = await productsService.getAll();
  if (!type) {
    return res.status(200).json(message);
  }
}

async function receiveById(req, res) {
  const { id } = req.params;
  const { type, message } = await productsService.getById(id);
  if (!type) {
    return res.status(200).json(message);
  }

  return res.status(mapError(type)).json({ message });
}

module.exports = {
  receiveAll,
  receiveById,
};
