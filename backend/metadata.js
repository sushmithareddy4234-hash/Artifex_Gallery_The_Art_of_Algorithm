function createNFTMetadata(name, description, imageUrl, owner) {
  return {
    name: name,
    symbol: 'MYAI',
    description: description,
    image: imageUrl,
    attributes: [
      { trait_type: 'Creator', value: 'AI NFT Generator' },
      { trait_type: 'Owner', value: owner || 'unknown' }
    ]
  };
}

module.exports = { createNFTMetadata };
