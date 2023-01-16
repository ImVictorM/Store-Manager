const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const {
  validSaleList,
  saleListWithInvalidProductId,
  saleListWithInvalidQuantity,
  validCreationResponse
} = require('../mocks/salesMock');
const { salesService } = require('../../../src/services');

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
  })
});
