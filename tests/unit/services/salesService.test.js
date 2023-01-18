const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, productsModel } = require('../../../src/models');
const {
  validSaleList,
  saleListWithInvalidProductId,
  saleListWithInvalidQuantity,
  validCreationResponse,
  allSalesFromDB,
  saleListByIdFromDB,
  invalidSaleList,
} = require('../mocks/salesMock');
const { allProductsFromDB } = require('../mocks/productsMock');
const { salesService } = require('../../../src/services');
const camelize = require('camelize');

describe('Testing sales service', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('POST /sales', function () {
    it('Returns an error when some product is not found on db', async function () {
      sinon.stub(productsModel, 'findById')
        .onFirstCall().resolves(allProductsFromDB[0])
        .onSecondCall().resolves(undefined);

      const response = await salesService.registerSales(invalidSaleList);

      expect(response).to.be.deep.equal({
        type: 'NOT_FOUND',
        message: 'Product not found',
      });
    });

    it('Returns an error when some productId is invalid', async function () {
      const response = await salesService.registerSales(saleListWithInvalidProductId);

      expect(response).to.be.deep.equal({
        type: 'UNPROCESSABLE_ENTITY',
        message: '"productId" must be a number',
      });
    });

    it('Returns an error when some quantity is invalid', async function () {
      const response = await salesService.registerSales(saleListWithInvalidQuantity);

      expect(response).to.be.deep.equal({
        type: 'UNPROCESSABLE_ENTITY',
        message: '"quantity" must be greater than or equal to 1',
      });
    });

    it('Can create new sales succesfully', async function () {
      sinon.stub(productsModel, 'findById')
        .onFirstCall().resolves(allProductsFromDB[0])
        .onSecondCall().resolves(allProductsFromDB[1]);
      sinon.stub(salesModel, 'createSoldProducts').resolves(validCreationResponse);

      const response = await salesService.registerSales(validSaleList);

      expect(response).to.be.deep.equal({
        type: null,
        message: validCreationResponse,
      });
    });
  });

  describe('GET /sales', function () {
    it('Can get all sales', async function () {
      const salesPattern = allSalesFromDB.map((sale) => camelize(sale));
      sinon.stub(salesModel, 'findAll').resolves(salesPattern);

      const response = await salesService.getAll();

      expect(response).to.deep.equal({
        type: null,
        message: salesPattern
      });
    });
  });

  describe('GET /sales/:id', function () {
    it('Returns an error when none sale is found', async function () {
      sinon.stub(salesModel, 'findById').resolves([]);

      const response = await salesService.getById(777);

      expect(response).to.deep.equal({
        type: 'NOT_FOUND',
        message: 'Sale not found',
      });
    });

    it('Can get a sale list by id', async function () {
      const salesPattern = saleListByIdFromDB.map((sale) => camelize(sale));
      sinon.stub(salesModel, 'findById').resolves(salesPattern);

      const response = await salesService.getById(1);

      expect(response).to.deep.equal({
        type: null,
        message: salesPattern,
      });
    });
  });

  describe('DELETE /sales/:id', function () {
    it('Retuns an error when id is invalid', async function () {
      sinon.stub(salesModel, 'findById').resolves([]);

      const response = await salesService.deleteInteraction(777);

      expect(response).to.be.deep.equal({
        type: 'NOT_FOUND',
        message: 'Sale not found',
      });
    });

    it('Delete a sale successfully', async function () {
      const responseFromModel = saleListByIdFromDB.map((sale) => camelize(sale));
      sinon.stub(salesModel, 'findById').resolves(responseFromModel);

      const response = await salesService.deleteInteraction(1);

      expect(response).to.be.deep.equal({
        type: null,
        message: 'Deleted successfully',
      });
    });
  });

  describe('PUT /sales/:id', function () {
    it('Returns an error when some product is not found on db', async function () {
      sinon.stub(salesModel, 'findById').resolves(saleListByIdFromDB);
      sinon.stub(productsModel, 'findById').resolves(undefined);

      const response = await salesService.updateInteraction(1, invalidSaleList);

      expect(response).to.be.deep.equal({
        type: 'NOT_FOUND',
        message: 'Product not found',
      });
    });

    it('Returns an error when id is invalid', async function () {
      sinon.stub(salesModel, 'findById').resolves([]);

      const response = await salesService.updateInteraction(777, validSaleList);

      expect(response).to.be.deep.equal({
        type: 'NOT_FOUND',
        message: 'Sale not found',
      });
    });

    it('Returns an error when the request is invalid', async function () {
      const modelReturn = saleListByIdFromDB.map((sale) => camelize(sale));
      sinon.stub(salesModel, 'findById').resolves(modelReturn);

      const response = await salesService.updateInteraction(1, saleListWithInvalidProductId);

      expect(response).to.be.deep.equal({
        type: 'UNPROCESSABLE_ENTITY',
        message: '"productId" must be a number'
      });
    });

    it('Updates a sale list successfully', async function () {
      const modelReturn = saleListByIdFromDB.map((sale) => camelize(sale));

      sinon.stub(productsModel, 'findById')
        .onFirstCall().resolves(allProductsFromDB[0])
        .onSecondCall().resolves(allProductsFromDB[1]);
      sinon.stub(salesModel, 'findById').resolves(modelReturn);

      const response = await salesService.updateInteraction(1, validSaleList);

      expect(response).to.be.deep.equal({
        type: null,
        message: {
          saleId: 1,
          itemsUpdated: validSaleList,
        }
      });
    });
  });
});
