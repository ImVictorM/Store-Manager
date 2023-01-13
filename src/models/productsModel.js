const PRODUCTS_TABLE = 'StoreManager.products';
const { connection } = require('../database');

async function findAll() {
  const query = 'SELECT * FROM ? ORDER BY id';
  const [products] = await connection.execute(query, [PRODUCTS_TABLE]);
  return products;
}

module.exports = {
  findAll,
};
