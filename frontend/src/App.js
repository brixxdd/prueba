import React, { useState } from 'react';
import './index.css';

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [loading, setLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/pokemon/${pokemonName.toLowerCase()}`);
      const data = await response.json();
      setPokemonData(data);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="px-8 py-6">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
            Busca tu <span className="text-blue-600">Pokémon</span>
          </h1>
          
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Ingresa nombre o número"
                value={pokemonName}
                onChange={(e) => setPokemonName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
            >
              Buscar
            </button>
          </form>

          {/* Estado de carga */}
          {loading && (
            <div className="mt-8 text-center text-gray-600">
              <p className="animate-pulse">Cargando...</p>
            </div>
          )}

          {/* Información del Pokémon */}
          {pokemonData && !loading && (
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <div className="flex flex-col items-center">
                <img
                  src={pokemonData.sprite}
                  alt={pokemonData.nombre}
                  className="w-32 h-32 object-contain mb-4 transform hover:scale-110 transition duration-200"
                />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{pokemonData.nombre}</h2>
                <div className="flex gap-2 mb-4">
                  {pokemonData.tipos.map((tipo, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-semibold"
                    >
                      {tipo}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600">ID: #{String(pokemonData.id).padStart(3, '0')}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
