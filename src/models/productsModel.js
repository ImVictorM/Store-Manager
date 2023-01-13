const { connection } = require('../database');

async function findAll() {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id ASC';
  const [products] = await connection.execute(query);
  return products;
}

module.exports = {
  findAll,
};
