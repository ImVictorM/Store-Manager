const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const {
  validSaleList,
  allSalesFromDB,
  saleListByIdFromDB,
} = require('../mocks/salesMock');
const { connection } = require('../../../src/database');
const camelize = require('camelize');

describe('Testing sales model', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('POST /sales', function () {
    it('Can insert a product list to the database', async function () {
      sinon.stub(connection, 'execute')
        .onFirstCall().resolves([{ insertId: 1 }])
        .onSecondCall().resolves()
        .onThirdCall().resolves();

      const response = await salesModel.createSoldProducts(validSaleList);

      expect(response).to.deep.equal({
        id: 1,
        itemsSold: validSaleList
      });
    });
  });

  describe('GET /sales', function () {
    it('Can get all sales succesfully', async function () {
      sinon.stub(connection, 'execute').resolves([allSalesFromDB]);

      const response = await salesModel.findAll();

      const expectedSalesPattern = allSalesFromDB.map((sale) => camelize(sale));

      expect(response).to.deep.equal(expectedSalesPattern);
    });
  });

  describe('GET /sales:id', function () {
    it('Can get a sale list by id', async function () {
      sinon.stub(connection, 'execute').resolves([saleListByIdFromDB])

      const response = await salesModel.findById(1);

      const expectedSalesPattern = saleListByIdFromDB.map((sale) => camelize(sale));

      expect(response).to.deep.equal(expectedSalesPattern);
    });
  });
});
