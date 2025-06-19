const { getFromCache, saveToCache } = require('../utils/cache.util');

async function getOfficialUpdates(req, res) {
  const { id: disasterId } = req.params;
  const cacheKey = `official_updates:${disasterId}`;
  const cached = await getFromCache(cacheKey);
  if (cached) return res.json(cached);

  try {
    // 🧪 Mocked updates
    const updates = [
      {
        title: "Flood Safety Guidelines",
        url: "https://www.fema.gov/flood-guidelines",
        summary: "Evacuate low-lying areas. Avoid standing water.",
        source: "FEMA"
      },
      {
        title: "Red Cross Earthquake Response",
        url: "https://www.redcross.org/earthquake-relief",
        summary: "List of emergency shelters and supplies available.",
        source: "Red Cross"
      }
    ];

    await saveToCache(cacheKey, updates); // Cache for 1 hour
    res.json(updates);
  } catch (err) {
    console.error('Mock update fetch failed:', err.message);
    res.status(500).json({ error: 'Mock updates failed' });
  }
}

module.exports = { getOfficialUpdates };
