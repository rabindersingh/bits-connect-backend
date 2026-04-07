const express = require('express');
const router = express.Router();

router.get('/stats', (req, res) => {
  res.json({ success: true, stats: { total: 3, approved: 1, pending: 2, crisis: 1 } });
});

router.get('/queue', (req, res) => {
  res.json({ success: true, data: { pending: [{ id: 1, content: 'Test' }] } });
});

router.get('/confessions', (req, res) => {
  res.json({ success: true, confessions: [{ id: 1, content: 'Test confession' }] });
});

module.exports = router;
