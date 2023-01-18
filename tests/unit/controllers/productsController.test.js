const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const {
  allProductsFromDB,
  productToCreate,
  productToUpdate,
  updatedProduct,
  hammerSearch
} = require('../mocks/productsMock');


describe('Testing products controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('GET /products', function () {
    it('Can responde with all products', async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAll').resolves({
        type: null,
        message: allProductsFromDB,
      });

      await productsController.receiveAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsFromDB);
    });
  });

  describe('GET /sales/search?q=...', function () {
    it('Can receive products base on user search', async function () {
      const res = {};
      const req = {
        query: { q: 'Martelo' },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'getBySearchQuery').resolves({
        type: null,
        message: hammerSearch
      });

      await productsController.receiveBySearchQuery(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(hammerSearch);
    });
  });

  describe('GET /products/:id', function () {
    it('Can responde a request containing a valid id', async function () {
      const validId = 1;
      const idOneProduct = allProductsFromDB[0];
      const res = {};
      const req = {
        params: validId
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'getById').resolves({
        type: null,
        message: idOneProduct,
      });

      await productsController.receiveById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(idOneProduct);
    });

    it('Returns an error when the request contains an invalid id', async function () {
      const invalidId = 999;
      const res = {};
      const req = {
        params: invalidId
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'getById').resolves({
        type: 'NOT_FOUND',
        message: 'Product not found',
      });

      await productsController.receiveById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found'});
    });
  });

  describe('POST /products', function () {
    it('Can create a new product', async function () {
      const req = { body: productToCreate };
      const res = {};
      const createdProduct = {
        id: 7,
        ...productToCreate,
      }

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'insertNew').resolves({
        type: null,
        message: createdProduct
      });

      await productsController.requestCreation(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(createdProduct);
    });

    it('Returns an error when product is invalid', async function () {
      const req = { body: {} };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'insertNew').resolves({
        type: 'UNPROCESSABLE_ENTITY',
        message: '"name" is required'
      });

      await productsController.requestCreation(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"name" is required'
      });
    });
  });

  describe('PUT /products/:id', function () {
    it('Returns an error when product is not found', async function () {
      const req = {
        body: productToUpdate,
        params: { id: 777 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'updateInteraction').resolves({
        type: 'NOT_FOUND',
        message: 'Product not found',
      });

      await productsController.requestUpdate(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Can update a product successfully', async function () {
      const req = {
        body: productToUpdate,
        params: { id: 1 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'updateInteraction').resolves({
        type: null,
        message: updatedProduct,
      });

      await productsController.requestUpdate(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updatedProduct);
    });
  });

  describe('DELETE /products/:id', function () {
    it('Retuns an error when id isn\'t valid', async function () {
      const req = {
        params: { id: 777 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'deleteInteraction').resolves({
        type: 'NOT_FOUND',
        message: 'Product not found',
      });

      await productsController.requestDelete(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Deletes a product successfully', async function () {
      const req = {
        params: { id: 1 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();

      sinon.stub(productsService, 'deleteInteraction').resolves({
        type: null,
        message: 'Deleted successfully',
      });

      await productsController.requestDelete(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.end).to.have.been.calledAfter(res.status);
    });
  });
});
