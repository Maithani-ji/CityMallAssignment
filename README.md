# 🌍 Disaster Response Coordination Platform

This is a full-stack MERN-style platform (with Supabase + Node.js backend) to report, track, and respond to disasters in real-time.

## 🚀 Features

- 🆕 Create disasters with location + tags
- 🧭 Geocode locations from text descriptions
- 📸 Submit reports with image verification (via Gemini API)
- 🧵 Fetch social and official updates (mocked)
- 🛰️ Real-time updates using Socket.IO
- ⚡ Redis-based caching for geocode/image data
- 🗺️ Nearby resource queries via lat/lon
- 🔐 Powered by Supabase (PostgreSQL + PostGIS)

---

## 🧑‍💻 Tech Stack

- **Backend**: Node.js, Express, Supabase (PostgreSQL + PostGIS), Redis
- **Frontend**: Vanilla JS + HTML (minimal UI)
- **Real-Time**: Socket.IO
- **AI**: Google Gemini Vision API
- **Caching**: Redis
- **Geocoding**: Gemini text-to-location (mocked in controller)

---

## 📦 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/disaster-response-platform
cd disaster-response-platform
