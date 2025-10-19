// server.js
import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.static('public')); // index.html داخل مجلد public

app.get('/api/klines', async (req, res) => {
    const symbol = req.query.symbol || 'BTCUSDT';
    const interval = req.query.interval || '1m';
    const limit = req.query.limit || 200;

    const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);
    const data = await response.json();
    res.json(data);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
