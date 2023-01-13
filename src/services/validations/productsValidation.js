function productWasFound(product) {
  if (product) {
    return true;
  }
  return {
    message: 'Product not found',
  };
}

module.exports = {
  productWasFound,
};
