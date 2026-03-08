import { useState } from "react";
import axios from "axios";

export default function NFTForm() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");

  const generateNFT = async () => {
    try {
      const res = await axios.post("http://localhost:3000/generate-nft", {
        prompt: prompt,
        name: "AI NFT",
        description: "Generated NFT"
      });

      setImage(res.data.imageUrl);

    } catch (error) {
      console.error(error);
      alert("Error generating NFT");
    }
  };

  return (
    <div className="min-h-screen flex justify-center pt-24 bg-gradient-to-b from-purple-900 via-purple-800 to-purple-700">
      
      <div className="grid grid-cols-2 gap-8 w-[850px]">

        {/* Left Card */}
        <div className="bg-purple-700/60 backdrop-blur-md p-6 rounded-xl shadow-xl h-[220px]">

          <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
             Artifex AI Gallery
          </h1>

          <input
            type="text"
            placeholder="Describe your NFT image..."
            className="w-full p-3 rounded-md mb-4 text-black"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button
            onClick={generateNFT}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 rounded-md font-semibold hover:opacity-90"
          >
            Generate NFT
          </button>
        </div>

        {/* Right Card */}
        <div className="bg-purple-700/40 flex items-center justify-center rounded-xl text-gray-200 text-lg h-[220px]">

          {image ? (
            <img src={image} alt="NFT Preview" className="rounded-lg max-h-full" />
          ) : (
            "Generate an NFT to see preview"
          )}

        </div>

      </div>

    </div>
  );
}
