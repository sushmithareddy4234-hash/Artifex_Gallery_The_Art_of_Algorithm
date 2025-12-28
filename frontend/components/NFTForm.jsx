import React, { useState } from 'react';
import axios from 'axios';

export default function NFTForm() {
  const [prompt, setPrompt] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await axios.post((process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000') + '/generate-nft', { prompt, name, description });
      setResult(resp.data);
    } catch (err) {
      alert('Failed: ' + err);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h2>Artifex — AI NFT Generator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input value={prompt} onChange={(e)=>setPrompt(e.target.value)} placeholder="Describe image..." style={{width: '100%', padding: 8}} required />
        </div>
        <div style={{marginTop:8}}>
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="NFT name" style={{width: '100%', padding: 8}} required />
        </div>
        <div style={{marginTop:8}}>
          <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" style={{width:'100%', padding:8}} required />
        </div>
        <button type="submit" disabled={loading} style={{marginTop:12, padding:'8px 16px'}}> {loading ? 'Generating...' : 'Generate NFT' }</button>
      </form>

      {result && (
        <div style={{marginTop:20}}>
          <h3>Preview</h3>
          <img src={result.imageUrl} alt="generated" style={{width:300, height:300, objectFit:'cover'}} />
          <p>Metadata URI: <a href={result.metadataUri} target="_blank" rel="noreferrer">{result.metadataUri}</a></p>
        </div>
      )}
    </div>
  );
}
