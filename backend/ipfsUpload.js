const pinataSDK = require('@pinata/sdk');
const axios = require('axios');
const { Readable } = require('stream');
require('dotenv').config();

const PINATA_JWT = process.env.PINATA_JWT || '';

let pinata = null;
if (PINATA_JWT) pinata = pinataSDK({ pinataJWTKey: PINATA_JWT });

async function uploadToIPFS(dataBuffer, options) {
  if (!pinata) {
    console.warn('PINATA_JWT not set. Skipping real upload and returning placeholder CID URL.');
    // return a fake IPFS gateway URL
    return 'https://gateway.pinata.cloud/ipfs/QmPlaceholderCID';
  }
  const stream = Readable.from(dataBuffer);
  const result = await pinata.pinFileToIPFS(stream, options);
  return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
}

async function uploadMetadata(metadata) {
  try {
    // fetch image first (could be URL from OpenAI)
    const imageResp = await axios.get(metadata.image, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(imageResp.data);
    const imageUrl = await uploadToIPFS(imageBuffer, { pinataMetadata: { name: `${metadata.name}_image.png` } });

    const metadataWithIPFSImage = { ...metadata, image: imageUrl };
    const metadataBuffer = Buffer.from(JSON.stringify(metadataWithIPFSImage));
    const metadataUrl = await uploadToIPFS(metadataBuffer, { pinataMetadata: { name: `${metadata.name}_metadata.json` }, pinataOptions: { cidVersion: 0 } });

    return metadataUrl;
  } catch (err) {
    console.error('uploadMetadata error:', err.toString());
    throw err;
  }
}

module.exports = { uploadMetadata };
