const joi = require('joi');

const productStandard = joi.object({
  name: joi.string().min(5).required(),
});

module.exports = {
  productStandard,
};
