const axios = require("axios");

async function generateImage(prompt) {
  try {

    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        inputs: prompt
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
          "Accept": "image/png"
        },
        responseType: "arraybuffer"
      }
    );

    const base64Image = Buffer.from(response.data).toString("base64");

    return `data:image/png;base64,${base64Image}`;

  } catch (error) {
    console.error("Image generation error:", error.response?.data || error.message);
    throw error;
  }
}

module.exports = { generateImage };