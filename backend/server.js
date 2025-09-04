const express = require('express');
const cors = require('cors');
const shortid = require('shortid');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const urlStore = {};

app.post('/api/shorten', (req, res) => {
    try {
        const { url, expiry, customCode } = req.body;

        if (!url || !url.startsWith('http')) {
            return res.status(400).json({ error: 'Invalid URL' });
        }

        const code = customCode || shortid.generate();

        if (customCode && urlStore[customCode]) {
            return res.status(409).json({ error: 'Custom code already in use' });
        }

        const shortUrl = `http://localhost:3000/${code}`;

        urlStore[code] = {
            originalUrl: url,
            shortUrl,
            expiry: expiry || 10,
            createdAt: new Date(),
            clicks: 0
        };

        res.json({
            shortUrl,
            code,
            originalUrl: url,
            expiry: expiry || 10
        });
    } catch (error) {
        console.error('Error in /api/shorten:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/:code', (req, res) => {
    const { code } = req.params;
    const urlData = urlStore[code];

    if (!urlData) {
        return res.status(404).json({ error: 'URL not found' });
    }

    urlData.clicks++;
    res.redirect(urlData.originalUrl);
});

app.get('/api/stats', (req, res) => {
    const stats = Object.values(urlStore).map(url => ({
        shortUrl: url.shortUrl,
        originalUrl: url.originalUrl,
        clicks: url.clicks,
        createdAt: url.createdAt
    }));
    res.json(stats);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
