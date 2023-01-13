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

module.exports = {
  findAll,
  findById,
};
