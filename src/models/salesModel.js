const camelize = require('camelize');
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

async function findAll() {
  const query = `
  SELECT  sales.date, sales_products.*
  FROM StoreManager.sales AS sales
  INNER JOIN StoreManager.sales_products AS sales_products
  ON sales.id = sales_products.sale_id
  ORDER BY sales_products.sale_id ASC, sales_products.product_id
  `;
  const [saleList] = await connection.execute(query);
  const formattedSaleList = saleList.map((sale) => camelize(sale));
  return formattedSaleList;
}

async function findById(id) {
  const query = `
  SELECT  sales.date, sales_products.product_id, sales_products.quantity
  FROM StoreManager.sales AS sales
  INNER JOIN StoreManager.sales_products AS sales_products
  ON sales.id = sales_products.sale_id
  WHERE sales.id = ?
  ORDER BY sales_products.sale_id ASC, sales_products.product_id
  `;
  const [saleList] = await connection.execute(query, [id]);
  const formattedSaleList = saleList.map((sale) => camelize(sale));
  return formattedSaleList;
}

async function deleteById(id) {
  const query = `
  DELETE StoreManager.sales, StoreManager.sales_products
  FROM StoreManager.sales
  INNER JOIN StoreManager.sales_products
  ON StoreManager.sales.id = StoreManager.sales_products.sale_id
  WHERE id = ?`;
  await connection.execute(query, [id]);
}

module.exports = {
  createSoldProducts,
  findAll,
  findById,
  deleteById,
};
