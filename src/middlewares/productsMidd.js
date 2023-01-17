function validateReqKeys(req, res, next) {
  const { body: product } = req;
  if (!product.name) {
    return res.status(400).json({
      message: '"name" is required',
    });
  }
  return next();
}

module.exports = {
  validateReqKeys,
};
