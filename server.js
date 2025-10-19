const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.static('public')); // مجلد index.html

// API endpoint لجلب بيانات Binance
app.get('/klines', async (req, res) => {
    const symbol = req.query.symbol || 'BTCUSDT';
    const interval = req.query.interval || '1m';
    const limit = req.query.limit || '100';
    try {
        const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Binance data' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
