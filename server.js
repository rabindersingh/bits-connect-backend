const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ DB failed:', err.message);
  } else {
    console.log('✅ Database connected!');
  }
});

app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'ok', database: 'connected', message: 'BITS Connect Backend is running!' });
  } catch (error) {
    res.json({ status: 'error', error: error.message });
  }
});

// Admin endpoints (inline - no separate file)
app.get('/api/admin/stats', (req, res) => {
  res.json({ success: true, stats: { total: 3, approved: 1, pending: 2, crisis: 1 } });
});

app.get('/api/admin/queue', (req, res) => {
  res.json({ success: true, data: { pending: [{ id: 1, content: 'Test confession' }] } });
});

app.get('/api/admin/confessions', (req, res) => {
  res.json({ success: true, confessions: [{ id: 1, content: 'Test' }] });
});

app.get('/api/admin/crisis-alerts', (req, res) => {
  res.json({ success: true, alerts: [{ id: 1, content: 'Crisis alert' }] });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📊 Admin: http://localhost:${PORT}/api/admin/stats`);
});

module.exports = { pool, app };
