const { connection } = require('../database');

async function findAll() {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id ASC';
  const [products] = await connection.execute(query);
  return products;
}

async function findById(id) {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [product] = await connection.execute(query, [id]);
  return product[0];
}

async function insertNew(product) {
  const colums = Object.keys(product);
  const values = Object.values(product);
  const placeholders = Array(colums.length).fill('?').join(', ');
  const query = `INSERT INTO StoreManager.products (${placeholders}) VALUES (${placeholders})`;
  const [{ insertId }] = await connection.execute(query, [...colums, ...values]);
  const createdProduct = await findById(insertId);
  return createdProduct;
}

module.exports = {
  findAll,
  findById,
  insertNew,
};
