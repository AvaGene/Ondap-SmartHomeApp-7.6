const express = require('express');

const pool = require('../db');

const router = express.Router();

const deviceSelect = 'SELECT id, name, type, icon, status FROM devices';

function formatDevice(device) {
  return {
    ...device,
    status: device.status === 1,
  };
}

router.get('/devices', async (req, res) => {
  try {
    const [rows] = await pool.query(`${deviceSelect} ORDER BY id`);
    res.json(rows.map(formatDevice));
  } catch (error) {
    console.error('Failed to fetch devices:', error);
    res.status(500).json({ message: 'Database error.' });
  }
});

router.patch('/devices/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const deviceId = Number(id);

  if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(deviceId)) {
    return res.status(400).json({ message: 'Device ID must be a positive integer.' });
  }

  if (typeof status !== 'boolean') {
    return res.status(400).json({ message: 'Status must be a boolean.' });
  }

  try {
    await pool.query('UPDATE devices SET status = ? WHERE id = ?', [
      status ? 1 : 0,
      deviceId,
    ]);

    const [rows] = await pool.query(`${deviceSelect} WHERE id = ?`, [deviceId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Device not found.' });
    }

    res.json(formatDevice(rows[0]));
  } catch (error) {
    console.error('Failed to update device:', error);
    res.status(500).json({ message: 'Database error.' });
  }
});

module.exports = router;
