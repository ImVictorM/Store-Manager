const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { allProductsFromDB } = require('../mocks/productsMock');

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
    it('Can get a product by id receiving a valid name', async function () {
      const idOneProduct = allProductsFromDB[0];
      sinon.stub(productsModel, 'findById').resolves(idOneProduct);

      const response = await productsService.getById(1);

      expect(response).to.be.deep.equal(idOneProduct);
    });

    it('Retuns an error when receiving an invalid name', async function () {
      const invalidId = 999;
      sinon.stub(productsModel, 'findById').resolves(undefined);

      const response = await productsService.getById(invalidId);

      expect(response).to.deep.equal({
        type: 'NOT_FOUND',
        message: 'Product not found',
      });
    });
  })

});
