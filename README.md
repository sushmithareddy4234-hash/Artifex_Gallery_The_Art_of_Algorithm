# Artifex Gallery – AI Image Generator

Artifex Gallery is a simple AI project that generates images from text prompts.

The system improves the user prompt using **Groq AI** and then generates an image using **Stable Diffusion (HuggingFace)**.

---

## Features

- Generate AI images from text
- Prompt enhancement using Groq
- Image generation using Stable Diffusion
- Simple UI with image preview

---

## Tech Stack

Frontend
- React
- Next.js
- Tailwind CSS

Backend
- Node.js
- Express.js

AI APIs
- Groq API
- HuggingFace Stable Diffusion

---

## Project Structure

ARTIFEX-GALLERY

backend
- server.js
- imageGeneration.js
- metadata.js
- ipfsUpload.js

frontend
- components
- pages

---

## Installation

Clone repository

```
git clone https://github.com/sushmithareddy4234-hash/Artifex_Gallery_The_Art_of_Algorithm
```

Install backend

```
cd backend
npm install
```

Install frontend

```
cd ../frontend
npm install
```

---

## Environment Variables

Create `.env` in backend

```
GROQ_API_KEY=your_groq_key
HUGGINGFACE_API_KEY=your_huggingface_key
```

---

## Run Project

Start backend

```
cd backend
node server.js
```

Start frontend

```
cd frontend
npm run dev
```

Open browser

```
http://localhost:3001
```

---

## Author

Sushmitha Reddy  
CSE Student
