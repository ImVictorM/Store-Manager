const joi = require('joi');

const saleSchema = joi.object({
  productId: joi.number().required(),
  quantity: joi.number().min(1).required(),
});

const saleListSchema = joi.array().items(saleSchema);

module.exports = {
  saleListSchema,
};
