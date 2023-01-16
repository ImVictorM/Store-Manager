const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { validSaleList } = require('../mocks/salesMock');
const { connection } = require('../../../src/database');

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
  })
});
