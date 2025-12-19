import express from 'express';
import dotenv from 'dotenv';
import { generateImage } from './services/imageGen.js';
import { createNFTMetadata } from './services/metadata.js';
import { uploadMetadata } from './services/ipfsUpload.js';

dotenv.config();

const app = express();

import cors from "cors";
app.use(cors());

app.use(express.json());

app.post('/generate-nft', async (req, res) => {
  try {
    const { prompt, name, description, owner } = req.body;

    const imageUrl = await generateImage(prompt);
    const metadata = createNFTMetadata(name, description, imageUrl, owner);
    const metadataUri = await uploadMetadata(metadata);

    res.json({ imageUrl, metadataUri });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate NFT' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
