const axios = require('axios');
const supabase = require('../supabaseClient');
const { getFromCache, saveToCache } = require('../utils/cache.util');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

exports.verifyImageHandler = async (req, res) => {
  const { id } = req.params;
  const { image_url } = req.body;

  if (!image_url) {
    return res.status(400).json({ error: 'Missing image URL' });
  }

  const cacheKey = `image-verify:${image_url}`;
  const cached = await getFromCache(cacheKey);
  if (cached) return res.json(cached);

  try {
    const prompt = `Analyze this image URL: ${image_url}. Determine whether it shows real evidence of a disaster. Respond with either "real", "fake", or "unclear".`;

    const geminiResp = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    const text = geminiResp.data?.candidates?.[0]?.content?.parts?.[0]?.text.toLowerCase();
    let status = 'unclear';
    if (text.includes('real')) status = 'real';
    else if (text.includes('fake') || text.includes('edited')) status = 'fake';

    // Update the latest report for this disaster (can be customized)
    const { data: report } = await supabase
      .from('reports')
      .select('*')
      .eq('disaster_id', id)
      .eq('image_url', image_url)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (report) {
      await supabase
        .from('reports')
        .update({ verification_status: status })
        .eq('id', report.id);
    }

    const result = {
      verification_status: status,
      explanation: text
    };

    await saveToCache(cacheKey, result);

    // WebSocket emit
    global.emitUpdate?.('report_verified', {
      disaster_id: id,
      image_url,
      verification_status: status
    });

    res.json(result);
  } catch (err) {
    console.error('Image verify error:', err.message);
    res.status(500).json({ error: 'Failed to verify image' });
  }
};
