const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { connection } = require('../../../src/database');
const { allProductsFromDB } = require('../mocks/productsMock');

describe('Testing products models', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Can list all products', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsFromDB])

    const response = await productsModel.findAll();

    expect(response).to.be.deep.equal(allProductsFromDB);
  });

  it('Can find a product by id', async function () {
    const firstProduct = allProductsFromDB[0];
    sinon.stub(connection, 'execute').resolves([[firstProduct]])

    const response = await productsModel.findById(1);

    expect(response).to.be.deep.equal(firstProduct);
  });
});
