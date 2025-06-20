# 🌐 Disaster Response Coordination Platform

> A full-stack platform for real-time disaster tracking, report verification, and coordination, using Node.js, Supabase, and Google Gemini Vision API.

---

## 🧩 Project Overview

This app allows:

* ✅ **Creating disasters** by location, geocoded to coordinates
* 📍 **Geocoding** user-entered locations
* 📝 **Submitting image reports** (with AI-based verification)
* 📡 **Real-time updates** via Socket.IO
* 📦 **Fetching social + official updates**
* 🚑 **Nearby resource data** (lat/lon based)

---

## 🧰 Tech Stack

| Layer       | Stack                                           |
| ----------- | ----------------------------------------------- |
| Backend     | Node.js, Express, Supabase (Postgres + PostGIS) |
| Frontend    | HTML + Vanilla JS                               |
| Real-Time   | Socket.IO                                       |
| AI Verifier | Google Gemini Pro Vision                        |
| Geocoding   | Gemini-based text analysis (mockable)           |

---

## ⚙️ Prerequisites

Ensure you have:

* [Node.js](https://nodejs.org/) (v16+)
* A modern browser
* [Git](https://git-scm.com/)

---

## 🛠️ Local Setup Guide

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/disaster-response-platform
cd disaster-response-platform
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=3000
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_KEY=<your-service-role-key>
GEMINI_API_KEY=<your-gemini-api-key>

```


### 5. Run the Backend Server

```bash
node index.js
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🖥️ Frontend Setup

Static frontend — no build required.

### Open `frontend/index.html`

```bash
open frontend/index.html
```

Or visit via backend:

```url
http://localhost:3000
```

---

## 🧪 Sample API Calls

### Geocode

```bash
POST /api/geocode
{
  "description": "Andheri West, Mumbai"
}
```

### Create Disaster

```bash
POST /api/disasters
{
  "title": "Flood",
  "location_name": "Andheri West, Mumbai",
  "description": "Severe flooding",
  "tags": ["flood", "urgent"],
  "location": {
    "lat": 19.1197,
    "lon": 72.8468
  }
}
```

### Submit Report

```bash
POST /api/disasters/:id/reports
{
  "user_id": "user123",
  "content": "Waterlogged roads",
  "image_url": "https://example.com/photo.jpg"
}
```

---

## 📡 Real-Time Features

Socket.IO events:

| Event              | Description                     |
| ------------------ | ------------------------------- |
| `disaster_updated` | On disaster creation            |
| `report_verified`  | After Gemini validates an image |

---

## ✅ Deployment Notes

* This project does **not** use Supabase CLI — schema lives in Supabase dashboard.
* Redis is **optional** but improves caching performance.
* Static frontend supports direct testing of all APIs.

---

## 📁 Folder Structure

```
backend/
├── controllers/
├── routes/
├── utils/
├── websocket/
├── supabaseClient.js
├── index.js

frontend/
├── index.html
├── script.js

.env
README.md
```

---

## 📦 .gitignore Sample

```gitignore
node_modules/
.env
.DS_Store
npm-debug.log
```

---

## 🧠 Credits

* Supabase for database + PostGIS
* Google Gemini API for vision analysis
* OpenAI for assistance in code and setup

---

## 🚀 Done ✅

You're ready to demo or deploy your **Disaster Response Coordination Platform**! 🧭
