const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { connection } = require('../../../src/database');
const {
  allProductsFromDB,
  productToCreate,
  updatedProduct,
  hammerSearch,
} = require('../mocks/productsMock');

describe('Testing products models', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('GET /products', function () {
    it('Can list all products', async function () {
      sinon.stub(connection, 'execute').resolves([allProductsFromDB]);

      const response = await productsModel.findAll();

      expect(response).to.be.deep.equal(allProductsFromDB);
    });
  });

  describe('GET /sales/search?q=...', function () {
    it('Can find products based on user search', async function () {
      sinon.stub(connection, 'execute').resolves([hammerSearch]);

      const response = await productsModel.findBySearchQuery('Martelo');

      expect(response).to.have.lengthOf(1);
      expect(response[0]).to.be.deep.equal(hammerSearch[0]);
    });

    it('Returns all products when user search is null', async function () {
      sinon.stub(connection, 'execute').resolves([allProductsFromDB]);

      const response = await productsModel.findBySearchQuery();

      expect(response).to.be.deep.equal(allProductsFromDB);
    });
  });

  describe('GET /products/:id', function () {
    it('Can find a product by id', async function () {
      const firstProduct = allProductsFromDB[0];
      sinon.stub(connection, 'execute').resolves([[firstProduct]]);

      const response = await productsModel.findById(1);

      expect(response).to.be.deep.equal(firstProduct);
    });
  });

  describe('POST /products', function () {
    it('Can create a new product an return it containing id', async function () {
      const createdProduct = {
        id: 7,
        ...productToCreate
      }

      sinon.stub(connection, 'execute')
        .onFirstCall().resolves([{ insertId: 7 }])
        .onSecondCall().resolves([[createdProduct]]);

      const response = await productsModel.createNew(productToCreate);

      expect(response).to.deep.equal(createdProduct);
    });
  });

  describe('PUT /products/:id', function () {
    it('Can update a product successfully', async function () {
      sinon.stub(connection, 'execute')
        .onFirstCall().resolves()
        .onSecondCall().resolves([[updatedProduct]]);

      const response = await productsModel.updateById(1, productToCreate);

      expect(response).to.be.deep.equal(updatedProduct);
    });
  });

  describe('DELETE /products/:id', function () {
    it('Can delete a product successfully', async function () {
      sinon.stub(connection, 'execute')
        .onFirstCall().resolves()
        .onSecondCall().resolves([[undefined]]);

      await productsModel.deleteById(3);
      const response = await productsModel.findById(3);
      expect(response).to.be.equal(undefined);
    });
  });
});
