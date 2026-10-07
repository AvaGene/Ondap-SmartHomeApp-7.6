const express = require('express');

const pool = require('../db');

const router = express.Router();

router.get('/sensors', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT temperature, humidity, light_level
       FROM sensor_readings
       ORDER BY recorded_at DESC, id DESC
       LIMIT 1`,
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No sensor readings yet.' });
    }

    const reading = rows[0];
    res.json({
      temperature: Number(reading.temperature),
      humidity: Number(reading.humidity),
      light_level: Number(reading.light_level),
    });
  } catch (error) {
    console.error('Failed to fetch sensor reading:', error);
    res.status(500).json({ message: 'Database error.' });
  }
});

module.exports = router;
