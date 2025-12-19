import pinataSDK from '@pinata/sdk';
import axios from 'axios';
import { Readable } from 'stream';

const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });

async function uploadToIPFS(data, options) {
  const stream = Readable.from(data);
  const result = await pinata.pinFileToIPFS(stream, options);
  return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
}

export async function uploadMetadata(metadata) {
  const imageResponse = await axios.get(metadata.image, {
    responseType: "arraybuffer"
  });

  const imageBuffer = Buffer.from(imageResponse.data);

  const imageUrl = await uploadToIPFS(imageBuffer, {
    pinataMetadata: { name: `${metadata.name}_image.png` }
  });

  const updatedMetadata = { ...metadata, image: imageUrl };

  const metadataBuffer = Buffer.from(JSON.stringify(updatedMetadata));

  const metadataUrl = await uploadToIPFS(metadataBuffer, {
    pinataMetadata: { name: `${metadata.name}_metadata.json` }
  });

  return metadataUrl;
}
