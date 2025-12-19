import React, { useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);

  const generateArt = async () => {
    if (!prompt) {
      alert("Please enter a prompt!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();

      if (data.imageURL) {
        setImageURL(data.imageURL);
      } else {
        alert("Failed to generate image!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error!");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="title">🎨 Artifex AI Gallery</h1>

      <div className="input-row">
        <input
          type="text"
          placeholder="Enter your art prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button onClick={generateArt}>
          {loading ? "Generating..." : "Generate Art"}
        </button>
      </div>

      {imageURL && (
        <div className="image-box">
          <h3>Generated Image:</h3>
          <img src={imageURL} alt="Generated Art" />
        </div>
      )}
    </div>
  );
}

export default App;
