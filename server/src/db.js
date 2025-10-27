require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // optionally add ssl config for production
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
