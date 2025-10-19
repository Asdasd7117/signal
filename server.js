import express from 'express';
import fetch from 'node-fetch';

const app = express();

// ملفات static (HTML, JS, CSS)
app.use(express.static('public'));

// نقطة API لجلب بيانات Binance Klines
app.get('/api/klines', async (req, res) => {
    const symbol = req.query.symbol || 'BTCUSDT';
    const interval = req.query.interval || '1m';
    const limit = req.query.limit || '100';

    try {
        const response = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
        );
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Binance data' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
