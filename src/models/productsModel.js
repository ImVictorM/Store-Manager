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

async function createNew(product) {
  const colums = Object.keys(product);
  const values = Object.values(product);
  const placeholders = Array(colums.length).fill('?').join(', ');
  const query = `INSERT INTO StoreManager.products (${colums.join(', ')}) VALUES (${placeholders})`;
  const [{ insertId }] = await connection.execute(query, [...values]);
  const createdProduct = await findById(insertId);
  return createdProduct;
}

async function updateById(id, newProduct) {
  const { name } = newProduct;
  const query = `
  UPDATE StoreManager.products
  SET name = ?
  WHERE id = ?
  `;

  await connection.execute(query, [name, id]);
  const updatedProduct = await findById(id);
  return updatedProduct;
}

async function deleteById(id) {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  await connection.execute(query, [id]);
}

module.exports = {
  findAll,
  findById,
  createNew,
  updateById,
  deleteById,
};
