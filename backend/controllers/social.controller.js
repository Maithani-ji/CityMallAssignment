const { getFromCache, saveToCache } = require('../utils/cache.util');

// Mock social media data (can replace with real API later)
const MOCK_POSTS = [
  { user: 'citizen1', post: '#floodrelief Need food in Lower East Side, NYC' },
  { user: 'citizen2', post: 'Power outage in Andheri West, Mumbai. Urgent help needed' },
  { user: 'citizen3', post: 'All safe in Pune' },
];

const KEYWORDS = ['urgent', 'help', 'need', 'flood', 'earthquake', 'shelter'];

exports.getSocialMedia = async (req, res) => {
  const { id } = req.params;
  const cacheKey = `social-media:${id}`;

  const cached = await getFromCache(cacheKey);
  if (cached) return res.json(cached);

  try {
    // Filter posts by disaster-related keywords
    const filtered = MOCK_POSTS.filter(({ post }) =>
      KEYWORDS.some(keyword => post.toLowerCase().includes(keyword))
    );

    const result = {
      posts: filtered,
      updated_at: new Date().toISOString(),
    };

    await saveToCache(cacheKey, result);

    // Emit WebSocket event
    global.emitUpdate?.('social_media_updated', { disaster_id: id, posts: result.posts });

    res.json(result);
  } catch (err) {
    console.error('Social media fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch social media posts' });
  }
};
