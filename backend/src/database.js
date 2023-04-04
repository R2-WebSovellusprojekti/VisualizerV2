const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'r2db',
  password: 'password',
  port: 5432,
});
module.exports = pool;
