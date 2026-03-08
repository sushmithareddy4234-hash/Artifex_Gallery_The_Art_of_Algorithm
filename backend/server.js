const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Groq = require("groq-sdk");

const { generateImage } = require("./imageGeneration");
const { createNFTMetadata } = require("./metadata");
const { uploadMetadata } = require("./ipfsUpload");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Improve prompt using Groq
async function enhancePrompt(prompt) {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are an expert AI art prompt engineer. Improve prompts for image generation.",
        },
        {
          role: "user",
          content: `Rewrite this as a short image generation prompt. Only return the prompt: ${prompt}`,
        },
      ],
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Groq prompt enhancement error:", error);
    return prompt; // fallback
  }
}

// Main API
app.post("/generate-nft", async (req, res) => {
  try {
    const { prompt, name, description, owner } = req.body;

    if (!prompt || !name || !description) {
      return res.status(400).json({
        error: "prompt, name and description are required",
      });
    }

    console.log("Original prompt:", prompt);

    // 1️⃣ Improve prompt using Groq
    const improvedPrompt = await enhancePrompt(prompt);

    console.log("Improved prompt:", improvedPrompt);

    // 2️⃣ Generate Image
    const imageUrl = await generateImage(improvedPrompt);

    console.log("Generated image:", imageUrl);

    // 3️⃣ Create metadata
    const metadata = createNFTMetadata(
      name,
      description,
      imageUrl,
      owner || "unknown"
    );

    // 4️⃣ Upload metadata to IPFS
    const metadataUri = await uploadMetadata(metadata);

    console.log("Metadata URI:", metadataUri);

    // 5️⃣ Send response
    res.json({
      imageUrl,
      metadataUri,
      improvedPrompt,
    });
  } catch (error) {
    console.error("Error generating NFT:", error);

    res.status(500).json({
      error: "NFT generation failed",
      details: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});