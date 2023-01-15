const { salesSchema: { saleRequiredKeys } } = require('../schemas');

function validateKeys(req, res, next) {
  const { body: saleList } = req;
  let errorMessage = null;
  const keysAreValid = saleList.every((sale) => {
    const { error } = saleRequiredKeys.validate(sale);
    errorMessage = error.message;
    return !error;
  });

  if (!keysAreValid) {
    return res.status(400).json({ message: errorMessage });
  }

  return next();
}

module.exports = {
  validateKeys,
};
