
const socket = io('https://citymallassignment.onrender.com', {
  transports: ['websocket'], // Avoid polling issues
  withCredentials: true
});


socket.on('connect', () => {
  console.log('✅ Socket.IO connected');
});

socket.on('disconnect', () => {
  console.warn('⚠️ Socket.IO disconnected');
});

// Example of receiving real-time updates
socket.on('disaster_updated', (data) => {
  console.log('🆕 Real-time disaster update:', data);
  loadDisasters(); // reload list if needed
});

socket.on('report_verified', (data) => {
  console.log('📷 Report verified update:', data);
});
const API_BASE = 'https://citymallassignment.onrender.com/api';

document.getElementById('disasterForm').onsubmit = async (e) => {
    e.preventDefault();
  
    // Step 0: Get form values safely
    const titleVal = document.getElementById('title').value.trim();
    const locationInput = document.getElementById('location_name').value.trim();
    const descriptionVal = document.getElementById('description').value.trim();
    const tagsVal = document.getElementById('tags').value.trim();
    const ownerIdVal = document.getElementById('owner_id').value.trim();
  
    console.log('📥 User Input:', {
      title: titleVal,
      location_name: locationInput,
      description: descriptionVal,
      tags: tagsVal,
      owner_id: ownerIdVal
    });
  
    if (!locationInput) {
      alert('❌ Please enter a location');
      return;
    }
  
    // Step 1: Fetch geocode
    let geoData;
    try {
      console.log('🌍 Sending geocode request...');
      const geoRes = await fetch(`${API_BASE}/geocode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: locationInput })
      });
  
      geoData = await geoRes.json();
      console.log('📦 Geocode Response:', geoData);
    } catch (err) {
      console.error('🚨 Geocode fetch error:', err);
      alert('❌ Failed to contact geocode API');
      return;
    }
  
    if (!geoData || !geoData.lat || !geoData.lon) {
      alert('❌ Could not extract location coordinates. Try a more specific location.');
      return;
    }
  
    // Step 2: Prepare location WKT
    const lon = parseFloat(geoData.lon);
    const lat = parseFloat(geoData.lat);
    // const wkt = `SRID=4326;POINT(${lon} ${lat})`;
    console.log('📍 Parsed Coordinates:', { lat, lon });
    // console.log('🧾 WKT String:', wkt);
    const location = { lat, lon };
    
    
    // Step 3: Build body
    const body = {
      title: titleVal,
      location_name: geoData.location_name || locationInput,
      description: descriptionVal,
      tags: tagsVal.split(',').map(t => t.trim()).filter(Boolean),
      owner_id: ownerIdVal,
      location: location
    };
  
    console.log('📤 Sending disaster POST with body:', body);
  
    // Step 4: Submit to /disasters
    try {
      const res = await fetch(`${API_BASE}/disasters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
  
      const data = await res.json();
  
      if (res.ok) {
        console.log('✅ Disaster created:', data);
        alert('✅ Disaster Created');
        loadDisasters(); // refresh list
      } else {
        console.error('❌ Backend responded with error:', data);
        alert('❌ Error creating disaster: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('❌ Network/submit error:', err);
      alert('❌ Failed to create disaster due to network error');
    }
  };
  
  
  

// Report Submit
document.getElementById('reportForm').onsubmit = async (e) => {
  e.preventDefault();
  const disasterId = report_disaster_id.value;
  const body = {
    user_id: user_id.value,
    content: content.value,
    image_url: image_url.value,
    verification_status: 'pending',
  };

  let res, data;
try {
  res = await fetch(`${API_BASE}/disasters/${disasterId}/reports`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  data = await res.json();
} catch (e) {
  console.error('❌ Invalid JSON response from backend', e);
  alert('❌ Report failed: Invalid server response');
  return;
}

if (!res.ok) {
  console.error('❌ Backend responded with error:', data);
  alert('❌ Report failed: ' + (data?.error || 'Unknown error'));
  return;
}

alert('✅ Report submitted');

};

// Geocode
document.getElementById('geocodeForm').onsubmit = async (e) => {
  e.preventDefault();
  const res = await fetch(`${API_BASE}/geocode`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description: geo_description.value })
  });
  const data = await res.json();
  alert(`📍 ${data.location_name} → lat: ${data.lat}, lon: ${data.lon}`);
};

// Load disasters
async function loadDisasters() {
  const res = await fetch(`${API_BASE}/disasters`);
  const disasters = await res.json();
  const container = document.getElementById('disastersList');
  container.innerHTML = '';

  disasters.forEach(d => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${d.title}</h3>
      <p><b>ID:</b> ${d.id}</p>
      <p><b>Location:</b> ${d.location_name}</p>
      <p><b>Description:</b> ${d.description}</p>
      <p><b>Tags:</b> ${d.tags.join(', ')}</p>
      <button onclick="verifyImage('${d.id}')">🔍 Verify Image</button>
      <button onclick="getResources('${d.id}')">🧭 Get Resources</button>
      <button onclick="getSocial('${d.id}')">📣 Social Media</button>
      <button onclick="getUpdates('${d.id}')">📰 Official Updates</button>
    `;
    container.appendChild(card);
  });
}

loadDisasters();

// Feature Functions
async function verifyImage(id) {
  const url = prompt('Enter Image URL to verify');
  const res = await fetch(`${API_BASE}/disasters/${id}/verify-image`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image_url: url })
  });
  const data = await res.json();
  alert(`✅ Image Status: ${data.verification_status}`);
}

async function getResources(id) {
  const lat = prompt('Enter lat');
  const lon = prompt('Enter lon');
  const res = await fetch(`${API_BASE}/disasters/${id}/resources?lat=${lat}&lon=${lon}`);
  const data = await res.json();
  alert(`Resources: ${JSON.stringify(data, null, 2)}`);
}

async function getSocial(id) {
    try {
      const res = await fetch(`${API_BASE}/disasters/${id}/social-media`);
      const data = await res.json();
  
      if (!Array.isArray(data.posts)) {
        console.error('❌ Unexpected response format:', data);
        alert('❌ Failed to fetch social posts');
        return;
      }
  
      alert(`🧵 Social Posts:\n${data.posts.map(p => `@${p.user}: ${p.post}`).join('\n')}`);
    } catch (err) {
      console.error('🚨 Network error while fetching social posts:', err);
      alert('❌ Could not load social posts');
    }
  }
  

async function getUpdates(id) {
  const res = await fetch(`${API_BASE}/disasters/${id}/official-updates`);
  const data = await res.json();
  alert(`📋 Updates:\n${data.map(u => `• ${u.title} (${u.source})`).join('\n')}`);
}

// (Optional) Real-time updates
try {
  
  socket.on('report_verified', (data) => {
    alert(`✅ Real-time: Image Verified (${data.verification_status})`);
  });
} catch (e) {
  console.log('Socket.IO not enabled');
}
