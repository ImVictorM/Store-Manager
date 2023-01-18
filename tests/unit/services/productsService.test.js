const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const {
  allProductsFromDB,
  productToCreate,
  invalidProductToCreate,
  productToUpdate,
  updatedProduct,
  hammerSearch
} = require('../mocks/productsMock');

describe('Testing products service', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('GET /products', function () {
    it('Can get all products', async function () {
      sinon.stub(productsModel, 'findAll').resolves(allProductsFromDB);

      const response = await productsService.getAll();

      expect(response).to.deep.equal({
        type: null,
        message: allProductsFromDB,
      });
    });
  });

  describe('GET /sales/search?q=...', function () {
    it('Can get products based on user search', async function () {
      sinon.stub(productsModel, 'findBySearchQuery').resolves(hammerSearch);

      const response = await productsService.getBySearchQuery('Martelo');

      expect(response).to.be.deep.equal({
        type: null,
        message: hammerSearch,
      });
    });
  });

  describe('GET /products/:id', function () {
    it('Can get a product by id receiving a valid id', async function () {
      const idOneProduct = allProductsFromDB[0];
      sinon.stub(productsModel, 'findById').resolves(idOneProduct);

      const response = await productsService.getById(1);

      expect(response).to.be.deep.equal({
        type: null,
        message: idOneProduct,
      });
    });

    it('Retuns an error when receiving an invalid id', async function () {
      const invalidId = 999;
      sinon.stub(productsModel, 'findById').resolves(undefined);

      const response = await productsService.getById(invalidId);

      expect(response).to.deep.equal({
        type: 'NOT_FOUND',
        message: 'Product not found',
      });
    });
  });

  describe('POST /products', function () {
    it('Can insert a new product into the db', async function () {
      const createdProduct = {
        id: 7,
        ...productToCreate,
      }
      sinon.stub(productsModel, 'createNew').resolves(createdProduct);

      const response = await productsService.insertNew(productToCreate);

      expect(response).to.deep.equal({
        type: null,
        message: createdProduct,
      });
    });

    it('Returns an error when the product\'s name is invalid', async function () {
      const response = await productsService.insertNew(invalidProductToCreate);

      expect(response).to.deep.equal({
        type: 'UNPROCESSABLE_ENTITY',
        message: '"name" length must be at least 5 characters long',
      });
    });
  });

  describe('PUT /products/:id', function () {
    it('Returns an error when product id isn\'t valid', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined);

      const response = await productsService.updateInteraction(777, productToUpdate);

      expect(response).to.be.deep.equal({
        type: 'NOT_FOUND',
        message: 'Product not found',
      });
    });

    it('Retuns an error when the product\'s name isn\'t valid', async function () {
      const response = await productsService.updateInteraction(1, invalidProductToCreate);

      expect(response).to.be.deep.equal({
        type: 'UNPROCESSABLE_ENTITY',
        message: '"name" length must be at least 5 characters long',
      });
    });

    it('Can update a product successfully', async function () {
      const idOneProduct = allProductsFromDB[0];
      sinon.stub(productsModel, 'findById').resolves(idOneProduct);
      sinon.stub(productsModel, 'updateById').resolves(updatedProduct);

      const response = await productsService.updateInteraction(1, productToUpdate);

      expect(response).to.be.deep.equal({
        type: null,
        message: updatedProduct,
      });
    });
  });

  describe('DELETE /products/:id', function () {
    it('Returns an error when the id isn\'t valid', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined);

      const response = await productsService.deleteInteraction(777);

      expect(response).to.be.deep.equal({
        type: 'NOT_FOUND',
        message: 'Product not found',
      });
    });

    it('Can delete a product successfully', async function () {
      const idOneProduct = allProductsFromDB[0];
      sinon.stub(productsModel, 'findById').resolves(idOneProduct);

      const response = await productsService.deleteInteraction(1);

      expect(response).to.be.deep.equal({
        type: null,
        message: 'Deleted successfully',
      });
    });
  });
});
