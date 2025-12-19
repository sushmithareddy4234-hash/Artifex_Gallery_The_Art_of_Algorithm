import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export async function generateImage(prompt) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt: prompt,
        n: 1,
        size: "1024x1024"
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.DALLE_API_KEY}`
        }
      }
    );

    return response.data.data[0].url;
  } catch (error) {
    console.error(error);
    throw new Error("Image generation failed");
  }
}
