import express from 'express';
import Url from '../models/UrlModel.js';
import { isValidURL, isValidShortcode, generateUniqueShortcode } from '../utils/generateShortcode.js';

const router = express.Router();

// POST /shorturls
router.post('/', async (req, res) => {
  const { url, validity, shortcode } = req.body;

  if (!isValidURL(url)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  let finalShortcode = shortcode;

  if (shortcode && !isValidShortcode(shortcode)) {
    return res.status(400).json({ error: 'Invalid shortcode format' });
  }

  if (!finalShortcode) {
    do {
      finalShortcode = generateUniqueShortcode();
    } while (await Url.findOne({ shortcode: finalShortcode }));
  }

  const expiry = validity ? Date.now() + validity * 60 * 1000 : Date.now() + 30 * 60 * 1000;

  try {
    const shortUrl = await Url.create({
      originalUrl: url,
      shortcode: finalShortcode,
      expiry,
    });

    res.status(201).json({
      shortLink: `http://localhost:5000/shorturls/${shortUrl.shortcode}`,
      expiry: shortUrl.expiry.toISOString()
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Shortcode already exists' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /shorturls/:shortcode
router.get('/:shortcode', async (req, res) => {
  const { shortcode } = req.params;

  try {
    const urlDoc = await Url.findOne({ shortcode });

    if (!urlDoc) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    if (urlDoc.expiry < Date.now()) {
      return res.status(410).json({ error: 'Short URL has expired' });
    }

    urlDoc.clicks += 1;
    await urlDoc.save();

    res.redirect(urlDoc.originalUrl);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /shorturls/stats/:shortcode
router.get('/stats/:shortcode', async (req, res) => {
  const { shortcode } = req.params;

  try {
    const urlDoc = await Url.findOne({ shortcode });

    if (!urlDoc) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    res.json({
      originalUrl: urlDoc.originalUrl,
      clicks: urlDoc.clicks,
      creationDate: urlDoc.createdAt.toISOString(),
      expiry: urlDoc.expiry.toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;