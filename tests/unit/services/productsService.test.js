const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { allProductsFromDB, productToCreate, invalidProductToCreate } = require('../mocks/productsMock');

describe('Testing products service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Can get all products', async function () {
    sinon.stub(productsModel, 'findAll').resolves(allProductsFromDB);

    const response = await productsService.getAll();

    expect(response).to.deep.equal({
      type: null,
      message: allProductsFromDB,
    });
  });

  describe('Getting a product by id', function () {
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

  describe('Creating a new product', function () {
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

});
