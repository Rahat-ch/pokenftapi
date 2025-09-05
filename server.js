const express = require('express');
const cors = require('cors');
const pokemon = require('./pokemonData');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/pokemon/:idOrName', (req, res) => {
  const { idOrName } = req.params;
  
  let foundPokemon = null;
  
  if (!isNaN(idOrName)) {
    const id = parseInt(idOrName);
    foundPokemon = pokemon.find(p => p.id === id);
  } else {
    const name = idOrName.toLowerCase();
    foundPokemon = pokemon.find(p => p.name.toLowerCase() === name);
  }
  
  if (foundPokemon) {
    const attributes = foundPokemon.types.map(type => ({
      trait_type: "Type",
      value: type
    }));
    
    res.json({
      name: `${foundPokemon.name} #${foundPokemon.id}`,
      description: `${foundPokemon.description} This is a unique NFT from the Pokemon Collection.`,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${foundPokemon.id}.png`,
      attributes: attributes,
      properties: {
        collection: "Pokemon Collection",
        creator: "Rahat"
      }
    });
  } else {
    res.status(404).json({ error: 'Pokemon not found' });
  }
});

app.get('/api/pokemon', (req, res) => {
  const nftPokemon = pokemon.map(p => {
    const attributes = p.types.map(type => ({
      trait_type: "Type",
      value: type
    }));
    
    return {
      name: `${p.name} #${p.id}`,
      description: `${p.description} This is a unique NFT from the Pokemon Collection.`,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`,
      attributes: attributes,
      properties: {
        collection: "Pokemon Collection",
        creator: "Rahat"
      }
    };
  });
  
  res.json(nftPokemon);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Try: http://localhost:${PORT}/api/pokemon/25 or http://localhost:${PORT}/api/pokemon/pikachu`);
});