const supabase  = require('../supabaseClient');
const { getFromCache, saveToCache } = require('../utils/cache.util');
const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// POST /api/disasters/:id/reports
async function submitReport(req, res) {
  const { id } = req.params; // disasterId
  const { user_id, content, image_url } = req.body;

  if (!content || !image_url || !user_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const cacheKey = `verify:${image_url}`;
  const cached = await getFromCache(cacheKey);

  let verification_status = cached?.status || 'pending';

  if (!cached) {
    try {
      const prompt = `Analyze this image URL: ${image_url}. Is it a real disaster photo or not? Answer with "real", "fake", or "unclear".`;

      const geminiResp = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: prompt }] }]
        }
      );
      
      const analysis = geminiResp.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const verification_status = /fake|edited|not real/i.test(analysis) ? 'rejected' : 'verified';
      

      await saveToCache(cacheKey, { status: verification_status });
    } catch (err) {
      console.error('[Gemini Verify Error]', err.message);
    }
  }

  const { data, error } = await supabase.from('reports').insert([{
    disaster_id: id,
    user_id,
    content,
    image_url,
    verification_status,
    created_at: new Date().toISOString()
  }]).select();
// After inserting into Supabase
if (data && data[0]) {
  global.emitUpdate?.('report_verified', {
    disaster_id: id,
    image_url,
    verification_status,
  });
}
  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json(data[0]);
}


// GET /api/disasters/:id/reports
async function getReportsForDisaster(req, res) {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('disaster_id', id)
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
}
module.exports = {
  submitReport,
  getReportsForDisaster
};