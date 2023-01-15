const allProductsFromDB = [
  {
    id: 1,
    name: 'product 1'
  },
  {
    id: 2,
    name: 'product 2'
  },
  {
    id: 3,
    name: 'product 3'
  }
];

const productToCreate = {
  name: 'new product'
};

const invalidProductToCreate = {
  name: 'x'
};

module.exports = {
  allProductsFromDB,
  productToCreate,
  invalidProductToCreate,
}
