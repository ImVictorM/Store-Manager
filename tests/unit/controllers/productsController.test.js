const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { allProductsFromDB, productToCreate } = require('../mocks/productsMock');


describe('Testing products controller', function () {
  afterEach(function () {
    sinon.restore();
  });

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

  describe('Receiving a GET request containing id', function () {
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

  describe('Receiving a POST request', function () {
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
});
