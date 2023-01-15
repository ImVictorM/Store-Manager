const { connection } = require('../database');

async function createNewSale() {
  const query = 'INSERT INTO StoreManagar.sales (date) VALUES (DEFAULT)';
  const [{ insertId: saleId }] = await connection.execute(query);
  return saleId;
}

async function createSoldProducts(productList) {
  const saleId = await createNewSale();
  const salesProductsRelation = productList.map(async (product) => {
    const { productId, quantity } = product;

    const query = `
    INSERT INTO
    StoreManage.sales_products (product_id, sale_id, quantity)
    VALUES (?, ?, ?)
    `;

    await connection.execute(query, [productId, saleId, quantity]);
  });

  await Promise.all(salesProductsRelation);

  return {
    id: saleId,
    itemsSold: productList,
  };
}

module.exports = {
  createNewSale,
  createSoldProducts,
};
