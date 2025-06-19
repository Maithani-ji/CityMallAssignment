const supabase = require('../supabaseClient');
const axios = require('axios');
const { getFromCache, saveToCache } = require('../utils/cache.util');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function geocodeHandler(req, res) {
  const { description } = req.body;

  if (!description) return res.status(400).json({ error: 'Missing description' });

  const cacheKey = `geocode:${description}`;
  const cached = await getFromCache(cacheKey);
  if (cached) return res.json(cached);

  try {
    // 1. Call Gemini to extract location name
    const geminiResp = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + GEMINI_API_KEY,
        {
          contents: [{ parts: [{ text: `Extract the location from: ${description}` }] }]
        }
      );
    const locationName = geminiResp.data.candidates?.[0]?.content?.parts?.[0]?.text.trim();
    if (!locationName) throw new Error('Failed to extract location');

    // 2. Call OpenStreetMap for lat/lng
    const geoResp = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: locationName,
        format: 'json',
        limit: 1
      },
      headers: {
        'User-Agent': 'Disaster-Response-App'
      }
    });

    const location = geoResp.data?.[0];
    if (!location) throw new Error('Failed to geocode location');

    const result = {
      location_name: location.display_name,
      lat: parseFloat(location.lat),
      lon: parseFloat(location.lon)
    };

    await saveToCache(cacheKey, result);
    res.json(result);
  } catch (err) {
    console.error('Geocode error:', err.message);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { geocodeHandler };