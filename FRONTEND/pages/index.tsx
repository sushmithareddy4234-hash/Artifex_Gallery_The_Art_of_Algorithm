import React, { useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useWallet } from '@solana/wallet-adapter-react';
import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';
import { Connection } from '@solana/web3.js';

const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton),
  { ssr: false }
);

export default function Home() {
  const wallet = useWallet();

  const [prompt, setPrompt] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [imageUrl, setImageUrl] = useState('');
  const [metadataUri, setMetadataUri] = useState('');
  const [mintedAddress, setMintedAddress] = useState('');

  // Generate AI image + metadata using backend
  async function generateNFT() {
    const response = await axios.post('http://localhost:3000/generate-nft', {
      prompt,
      name,
      description,
      owner: wallet.publicKey?.toBase58()
    });

    setImageUrl(response.data.imageUrl);
    setMetadataUri(response.data.metadataUri);
  }

  // Mint NFT on Solana
  async function mintNFT() {
    const connection = new Connection('https://api.devnet.solana.com');
    const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));

    const { nft } = await metaplex.nfts().create({
      uri: metadataUri,
      name,
      sellerFeeBasisPoints: 500
    });

    setMintedAddress(nft.address.toBase58());
  }

  return (
    <div style={{ padding: '20px' }}>
      <WalletMultiButton />

      <h1>AI NFT Generator</h1>

      <input
        placeholder="Enter prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <input
        placeholder="NFT Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={generateNFT}>Generate NFT</button>

      {imageUrl && (
        <div>
          <img src={imageUrl} width="300" />
          <button onClick={mintNFT}>Mint NFT</button>
        </div>
      )}

      {mintedAddress && (
        <p>NFT Minted Successfully: {mintedAddress}</p>
      )}
    </div>
  );
}
