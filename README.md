# 🌐 Disaster Response Coordination Platform

> A full-stack platform for real-time disaster tracking, image verification, and coordination — built using **Node.js**, **Supabase**, and **Google Gemini Vision API**.

---

## 🔗 Live Demo

- **Frontend (Vercel)**: [https://city-mall-assignment.vercel.app](https://city-mall-assignment.vercel.app)  
- **Backend (Render)**: [https://citymallassignment.onrender.com](https://citymallassignment.onrender.com)

---

## 🧩 Features

- ✅ **Create disasters** with geocoded locations  
- 🧠 **AI-based image verification** (Google Gemini Vision API)  
- 📡 **Real-time updates** via Socket.IO  
- 📝 **Submit and view disaster reports**  
- 🧭 **Fetch nearby resources** based on latitude/longitude  
- 📢 **Social and official updates** pulled dynamically  

---

## 🧰 Tech Stack

| Layer       | Stack                                           |
| ----------- | ----------------------------------------------- |
| **Backend** | Node.js, Express, Supabase (Postgres + PostGIS) |
| **Frontend**| HTML, Vanilla JS                                |
| **Real-Time** | Socket.IO                                     |
| **AI Vision**| Google Gemini Pro Vision                       |
| **Geocoding**| Gemini-based text analysis (mocked/mocked)     |

---

## ⚙️ Prerequisites

Ensure you have installed:

- [Node.js](https://nodejs.org/) (v16+)
- [Git](https://git-scm.com/)
- A modern browser

---

## 🛠️ Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/disaster-response-platform
cd disaster-response-platform
```

### 2. Setup Backend

```bash
cd backend
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `backend/` directory:

```env
PORT=3000
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_KEY=<your-service-role-key>
GEMINI_API_KEY=<your-gemini-api-key>
```

### 4. Run the Server

```bash
npm start
```

Backend will run at [http://localhost:3000](http://localhost:3000)

---

## 🖥️ Frontend Setup

No build needed — static HTML + JS.

### Option A: Open locally

```bash
open frontend/index.html
```

### Option B: Serve via backend

Visit [http://localhost:3000](http://localhost:3000) — static files are auto-served.

---

## 🧪 Sample API Usage

### ➤ Geocode Location

```http
POST /api/geocode
{
  "description": "Andheri West, Mumbai"
}
```

### ➤ Create Disaster

```http
POST /api/disasters
{
  "title": "Flood",
  "location_name": "Andheri West, Mumbai",
  "description": "Heavy waterlogging",
  "tags": ["flood", "urgent"],
  "location": {
    "lat": 19.1197,
    "lon": 72.8468
  }
}
```

### ➤ Submit Report

```http
POST /api/disasters/:id/reports
{
  "user_id": "user123",
  "content": "Waterlogged roads",
  "image_url": "https://example.com/photo.jpg"
}
```

---

## 📡 Real-Time Events

| Event              | Trigger                             |
| ------------------ | ----------------------------------- |
| `disaster_updated` | New disaster created                |
| `report_verified`  | After image verification by Gemini  |

---

## 🚀 Deployment Notes

- ✅ Deployed backend on **Render**
- ✅ Deployed frontend on **Vercel**
- ✅ CORS handled to allow frontend ↔ backend communication
- 🧠 Gemini Vision API usage is mocked when needed
- Redis is optional and used for caching in production

---

## 📁 Project Structure

```
backend/
├── controllers/
├── routes/
├── websocket/
├── utils/
├── supabaseClient.js
├── index.js

frontend/
├── index.html
├── script.js

.env
README.md
```

---

## 🧼 .gitignore

```gitignore
node_modules/
.env
.DS_Store
npm-debug.log
```

---

## 🧠 Credits

- Supabase for Postgres + PostGIS
- Google Gemini API for AI-based image analysis
- Render + Vercel for deployment
- OpenAI for development support

---

## ✅ Status: Production Ready

Everything is live and fully functional. Try submitting a report or viewing live disasters at:

👉 [https://city-mall-assignment.vercel.app](https://city-mall-assignment.vercel.app)
