const supabase = require('../supabaseClient');

// GET (already exists)
exports.getDisasters = async (req, res) => {
  try {
    const { tag } = req.query;

    let query = supabase
      .from('disasters')
      .select('*')
      .order('created_at', { ascending: false });

    if (tag) {
      query = query.contains('tags', [tag]);
    }

    const { data, error } = await query;
    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error('❌ Error getting disasters:', err.message);
    res.status(500).json({ error: 'Failed to fetch disasters' });
  }
};

// POST
exports.createDisaster = async (req, res) => {
  try {
    const {
      title,
      location_name,
      description,
      tags,
      location, // { lat, lon }
      owner_id = 'netrunnerX', // hardcoded/mock user
    } = req.body;

    const point = `SRID=4326;POINT(${location.lon} ${location.lat})`;

    const { data, error } = await supabase
      .from('disasters')
      .insert([
        {
          title,
          location_name,
          description,
          tags,
          owner_id,
          location: point,
          audit_trail: [
            {
              action: 'create',
              user_id: owner_id,
              timestamp: new Date().toISOString(),
            },
          ],
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Emit via WebSocket
    global.emitUpdate?.('disaster_updated', data);

    res.status(201).json(data);
  } catch (err) {
    console.error('❌ Error creating disaster:', err.message);
    res.status(500).json({ error: 'Failed to create disaster' });
  }
};

// PUT
exports.updateDisaster = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      location_name,
      description,
      tags,
      location,
      user_id = 'netrunnerX',
    } = req.body;

    const point = location
      ? `SRID=4326;POINT(${location.lon} ${location.lat})`
      : undefined;

    const fieldsToUpdate = {
      title,
      location_name,
      description,
      tags,
    };

    if (point) fieldsToUpdate.location = point;

    // Add audit log
    const { data: oldData } = await supabase
      .from('disasters')
      .select('audit_trail')
      .eq('id', id)
      .single();

    const newTrail = [
      ...(oldData?.audit_trail || []),
      {
        action: 'update',
        user_id,
        timestamp: new Date().toISOString(),
      },
    ];

    fieldsToUpdate.audit_trail = newTrail;

    const { data, error } = await supabase
      .from('disasters')
      .update(fieldsToUpdate)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    global.emitUpdate?.('disaster_updated', data);

    res.status(200).json(data);
  } catch (err) {
    console.error('❌ Error updating disaster:', err.message);
    res.status(500).json({ error: 'Failed to update disaster' });
  }
};

// DELETE
exports.deleteDisaster = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('disasters')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    global.emitUpdate?.('disaster_updated', { deleted_id: id });

    res.status(200).json({ message: 'Disaster deleted', data });
  } catch (err) {
    console.error('❌ Error deleting disaster:', err.message);
    res.status(500).json({ error: 'Failed to delete disaster' });
  }
};
