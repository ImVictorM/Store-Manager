const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const {
  validSaleList,
  saleListWithInvalidProductId,
  saleListWithInvalidQuantity,
  validCreationResponse,
  allSalesFromDB,
  saleListByIdFromDB
} = require('../mocks/salesMock');
const { salesService } = require('../../../src/services');
const camelize = require('camelize');

describe('Testing sales service', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('POST /sales', function () {
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
      sinon.stub(salesModel, 'createSoldProducts').resolves(validCreationResponse)

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
});
