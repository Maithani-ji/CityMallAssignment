# 🌐 Disaster Response Coordination Platform

> A full-stack platform for real-time disaster tracking, report verification, and coordination, using Node.js, Supabase, and Google Gemini Vision API.

---

## 🧩 Project Overview

This app allows:
- ✅ **Creating disasters** by location, geocoded to coordinates
- 📍 **Geocoding** user-entered locations
- 📝 **Submitting image reports** (with AI-based verification)
- 📡 **Real-time updates** via Socket.IO
- 📦 **Fetching social + official updates**
- 🚑 **Nearby resource data** (lat/lon based)


---

## 🧰 Tech Stack

| Layer       | Stack                                        |
|------------|-----------------------------------------------|
| Backend     | Node.js, Express, Supabase (Postgres + PostGIS) |
| Frontend    | HTML + Vanilla JS                            |
| Real-Time   | Socket.IO                                    |
| AI Verifier | Google Gemini Pro Vision                     |
| Geocoding   | Gemini-based text analysis (mockable)        |

---

## 🔐 Environment Variables (`backend/.env`)

```env
PORT=3000
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_KEY=<your-service-role-key>
GEMINI_API_KEY=<your-gemini-key>
REDIS_URL=redis://localhost:6379

1. Clone the Repo


git clone https://github.com/your-username/disaster-response-platform
cd disaster-response-platform

2. Install Backend Dependencies

cd backend
npm install

Start the Backend

cd backend
node index.js

✅ Your backend runs at: http://localhost:3000

🖥️ Frontend (Static)
No build step — just open the file.


open frontend/index.html
