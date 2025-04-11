import React, { useState } from 'react';
import './index.css';

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setPokemonName(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!pokemonName) return;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/pokemon/${pokemonName}`);
      const data = await response.json();
      setPokemonData(data);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Busca tu Pokémon</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Ingresa nombre o número"
          value={pokemonName}
          onChange={handleInputChange}
        />
        <input type="submit" value="Buscar" />
      </form>

      {loading && <p>Cargando...</p>}

      {pokemonData && !loading && (
        <div className="pokemon-info">
          <img
            src={pokemonData.sprite}
            alt={pokemonData.nombre}
          />
          <h2>{pokemonData.nombre}</h2>
          <p>Tipo: {pokemonData.tipos.join(', ')}</p>
          <p>ID: {pokemonData.id}</p>
        </div>
      )}

    </div>
  );
}

export default App;
