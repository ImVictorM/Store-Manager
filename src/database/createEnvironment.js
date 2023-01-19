const fs = require('fs');
const path = require('path');
const connection = require('./connection');

const { cwd } = process;

function runQuery(filePath) {
  return async () => {
    const sql = fs.readFileSync(filePath, 'utf8');
    await connection.query(sql);
    await connection.end();
  };
}

const runMigration = runQuery(path.resolve(cwd(), 'migration.sql'));
const runSeed = runQuery(path.resolve(cwd(), 'seed.sql'));

module.exports = {
  runMigration,
  runSeed,
};
