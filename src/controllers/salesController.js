const { salesService } = require('../services');
const { mapError } = require('../utils/errorMap');

async function requestCreation(req, res) {
  const { body: saleList } = req;
  const { type, message } = await salesService.registerSales(saleList);
  if (type) {
    return res.status(mapError(type)).json({ message });
  }

  return res.status(201).json(message);
}

async function receiveAll(_req, res) {
  const { message } = await salesService.getAll();
  return res.status(200).json(message);
}

async function receiveById(req, res) {
  const { params: { id } } = req;
  const { message, type } = await salesService.getById(id);
  if (type) {
    return res.status(mapError(type)).json({ message });
  }
  return res.status(200).json(message);
}

async function requestDelete(req, res) {
  const { params: { id } } = req;
  const { message, type } = await salesService.deleteInteraction(id);
  if (type) {
    return res.status(mapError(type)).json({ message });
  }
  return res.status(204).end();
}

module.exports = {
  requestCreation,
  receiveAll,
  receiveById,
  requestDelete,
};
