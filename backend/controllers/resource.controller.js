const supabase = require('../supabaseClient');

exports.getNearbyResources = async (req, res) => {
  const { lat, lon } = req.query;
  const { id: disaster_id } = req.params;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing lat/lon' });
  }

  try {
    const { data, error } = await supabase.rpc('get_nearby_resources', {
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      radius: 10000, // 10km
      disaster_id
    });

    if (error) throw error;

    // Emit socket event
    global.emitUpdate?.('resources_updated', {
      disaster_id,
      count: data.length
    });

    res.json(data);
  } catch (err) {
    console.error('Geospatial query error:', err.message);
    res.status(500).json({ error: 'Failed to get nearby resources' });
  }
};
