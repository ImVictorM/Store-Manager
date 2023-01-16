const { expect } = require('chai');
const sinon = require('sinon');
const {
  validSaleList,
  saleListWithInvalidProductId,
  saleListWithInvalidQuantity,
  validCreationResponse
} = require('../mocks/salesMock');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');

describe('Testing sales controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('POST /sales', function () {
    it('Returns an error when quantity is invalid', async function () {
      const req = { body: saleListWithInvalidQuantity };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'registerSales').resolves({
        type: 'UNPROCESSABLE_ENTITY',
        message: '"quantity" must be greater than or equal to 1',
      });

      await salesController.requestCreation(req, res);

      expect(res.status).to.have.been.calledWith(422)
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" must be greater than or equal to 1'
      })
    });

    it('Can create new sales succesfully', async function () {
      const req = { body: validSaleList };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'registerSales').resolves({
        type: null,
        message: validCreationResponse,
      });

      await salesController.requestCreation(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(validCreationResponse);
    });
  })
});
