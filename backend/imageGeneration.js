const axios = require('axios');
require('dotenv').config();

const DALLE_API_KEY = process.env.DALLE_API_KEY || '';

async function generateImage(prompt) {
  // This function calls OpenAI's Images API to generate an image from prompt.
  // For safety: if DALLE_API_KEY is not set, we return a placeholder image URL.
  if (!DALLE_API_KEY) {
    console.warn('DALLE_API_KEY is not set. Returning placeholder image.');
    return 'https://via.placeholder.com/1024x1024.png?text=ARTIFEX+PLACEHOLDER';
  }

  try {
    const resp = await axios.post(
      'https://api.openai.com/v1/images/generations',
      { prompt, n: 1, size: '1024x1024' },
      { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${DALLE_API_KEY}` } }
    );
    return resp.data.data[0].url;
  } catch (err) {
    console.error('generateImage error:', err.toString());
    // fallback
    return 'https://via.placeholder.com/1024x1024.png?text=ARTIFEX+ERROR';
  }
}

module.exports = { generateImage };
