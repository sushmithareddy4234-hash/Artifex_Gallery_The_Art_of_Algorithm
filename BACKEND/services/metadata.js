export function createNFTMetadata(name, description, imageUrl, owner) {
  return {
    name,
    symbol: "MYAI",
    description,
    image: imageUrl,
    attributes: [
      { trait_type: "Creator", value: "AI NFT Generator" },
      { trait_type: "Owner", value: owner }
    ]
  };
}
