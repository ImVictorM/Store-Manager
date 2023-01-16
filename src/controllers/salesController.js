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

module.exports = {
  requestCreation,
};