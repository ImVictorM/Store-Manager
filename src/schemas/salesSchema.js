const joi = require('joi');

const saleSchema = joi.object({
  productId: joi.number().required(),
  quantity: joi.number().min(1).required(),
});

const saleRequiredKeys = joi.object({
  productId: joi.required(),
  quantity: joi.required(),
});

const saleListSchema = joi.array().items(saleSchema);

module.exports = {
  saleListSchema,
  saleRequiredKeys,
};
