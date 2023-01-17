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

const updatedProduct = {
  id: 1,
  name: 'updated product'
};

const productToUpdate = {
  name: 'updated product'
};

module.exports = {
  allProductsFromDB,
  productToCreate,
  invalidProductToCreate,
  productToUpdate,
  updatedProduct,
}
