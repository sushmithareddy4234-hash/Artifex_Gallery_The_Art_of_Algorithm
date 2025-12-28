const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { generateImage } = require('./imageGeneration');
const { createNFTMetadata } = require('./metadata');
const { uploadMetadata } = require('./ipfsUpload');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

app.post('/generate-nft', async (req, res) => {
  try {
    const { prompt, name, description, owner } = req.body;
    if (!prompt || !name || !description) return res.status(400).json({ error: 'prompt,name,description required' });

    // 1. generate image (calls OpenAI - DALL·E). This uses the function in imageGeneration.js
    const imageUrl = await generateImage(prompt);

    // 2. create metadata object
    const metadata = createNFTMetadata(name, description, imageUrl, owner || 'unknown');

    // 3. upload image+metadata to IPFS (Pinata)
    const metadataUri = await uploadMetadata(metadata);

    // 4. return result
    res.json({ metadataUri, imageUrl });
  } catch (err) {
    console.error('Error /generate-nft', err);
    res.status(500).json({ error: 'Server error', details: String(err) });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
