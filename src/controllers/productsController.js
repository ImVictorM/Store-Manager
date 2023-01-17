const { productsService } = require('../services');
const { mapError } = require('../utils/errorMap');

async function receiveAll(_req, res) {
  const { message } = await productsService.getAll();
  return res.status(200).json(message);
}

async function receiveById(req, res) {
  const { id } = req.params;
  const { type, message } = await productsService.getById(id);
  if (!type) {
    return res.status(200).json(message);
  }

  return res.status(mapError(type)).json({ message });
}

async function requestCreation(req, res) {
  const { body: newProduct } = req;
  const { message, type } = await productsService.insertNew(newProduct);
  if (type) {
    return res.status(mapError(type)).json({ message });
  }
  return res.status(201).json(message);
}

async function requestUpdate(req, res) {
  const {
    body: newProduct,
    params: { id },
  } = req;

  const { message, type } = await productsService.updateInteraction(id, newProduct);
  if (type) {
    return res.status(mapError(type)).json({ message });
  }
  return res.status(200).json(message);
}

async function requestDelete(req, res) {
  const { params: { id } } = req;
  const { message, type } = await productsService.deleteInteraction(id);
  if (type) {
    return res.status(mapError(type)).json({ message });
  }
  return res.status(204).end();
}

module.exports = {
  receiveAll,
  receiveById,
  requestCreation,
  requestUpdate,
  requestDelete,
};
