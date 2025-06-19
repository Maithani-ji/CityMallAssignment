const  supabase  = require('../supabaseClient');

async function getFromCache(key) {
  const { data } = await supabase
    .from('cache')
    .select('value, expires_at')
    .eq('key', key)
    .maybeSingle();

  if (!data) return null;

  const expired = new Date(data.expires_at) < new Date();
  return expired ? null : data.value;
}

async function saveToCache(key, value, ttlMinutes = 60) {
  const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000).toISOString();

  await supabase.from('cache').upsert({ key, value, expires_at: expiresAt });
}

module.exports = { getFromCache, saveToCache };