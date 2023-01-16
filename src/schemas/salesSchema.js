const joi = require('joi');

const salePattern = joi.object({
  productId: joi.number(),
  quantity: joi.number().min(1),
});

const saleRequiredKeys = joi.object({
  productId: joi.required(),
  quantity: joi.required(),
});

module.exports = {
  saleRequiredKeys,
  salePattern,
};
