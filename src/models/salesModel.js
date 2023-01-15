const { connection } = require('../database');

async function createNewSale() {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (DEFAULT)';
  const [{ insertId: saleId }] = await connection.execute(query);
  return saleId;
}

async function createSoldProducts(saleList) {
  const saleId = await createNewSale();
  const salesProductsRelation = saleList.map(async (saleReport) => {
    const { productId, quantity } = saleReport;

    const query = `
    INSERT INTO
    StoreManager.sales_products (product_id, sale_id, quantity)
    VALUES (?, ?, ?)
    `;

    await connection.execute(query, [productId, saleId, quantity]);
  });

  await Promise.all(salesProductsRelation);

  return {
    id: saleId,
    itemsSold: saleList,
  };
}

module.exports = {
  createSoldProducts,
};
