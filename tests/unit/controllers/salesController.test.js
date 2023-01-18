const { expect } = require('chai');
const sinon = require('sinon');
const {
  validSaleList,
  saleListWithInvalidQuantity,
  validCreationResponse,
  allSalesFromDB,
  saleListByIdFromDB
} = require('../mocks/salesMock');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const camelize = require('camelize');

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
  });

  describe('GET /sales', function () {
    it('Can get all sales', async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const salesPattern = allSalesFromDB.map((sale) => camelize(sale));
      sinon.stub(salesService, 'getAll').resolves({
        type: null,
        message: salesPattern
      });

      await salesController.receiveAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesPattern);
    });
  });

  describe('GET /sales/:id', function () {
    it('Returns an error when none sale is found', async function () {
      const req = { params: { id: 777 }};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getById').resolves({
        type: 'NOT_FOUND',
        message: 'Sale not found',
      });

      await salesController.receiveById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });

    it('Get a sale list by id', async function () {
      const req = { params: { id: 1 }};
      const res = {};
      const salesPattern = saleListByIdFromDB.map((sale) => camelize(sale));

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getById').resolves({
        type: null,
        message: salesPattern,
      });

      await salesController.receiveById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesPattern);
    });
  });

  describe('DELETE /sales/:id', function () {
    it('Retuns an error when id is invalid', async function () {
      const req = { params: { id: 777 }};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'deleteInteraction').resolves({
        type: 'NOT_FOUND',
        message: 'Sale not found',
      });

      await salesController.requestDelete(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });

    it('Delete a sale successfully', async function () {
      const req = { params: { id: 1 }};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();

      sinon.stub(salesService, 'deleteInteraction').resolves({
        type: null,
        message: 'Deleted successfully',
      });

      await salesController.requestDelete(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.end).to.have.been.calledAfter(res.status);
    });
  });

  describe('PUT /sales/:id', function () {
    it('Returns an error when sale id is invalid', async function () {
      const req = {
        params: { id: 777 },
        body: validSaleList
      }

      const res = {}

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'updateInteraction').resolves({
        type: 'NOT_FOUND',
        message: 'Sale not found',
      });

      await salesController.requestUpdate(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });

    it('Updates a sale list successfully', async function () {
      const req = {
        params: { id: 1 },
        body: validSaleList
      }

      const res = {}

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'updateInteraction').resolves({
        type: null,
        message: {
          saleId: 1,
          itemsUpdated: validSaleList,
        },
      });

      await salesController.requestUpdate(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        saleId: 1,
        itemsUpdated: validSaleList,
      });
    });
  });
});
