const express = require('express');
const axios = require('axios');
const cors = require('cors'); // para permitir que el frontend se conecte
const app = express();
const port = 3001;

app.use(cors());

// Ruta para obtener un Pokémon por nombre o ID
app.get('/pokemon/:nombre', async (req, res) => {
  const nombre = req.params.nombre.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${nombre}`;

  try {
    const respuesta = await axios.get(url);
    const datos = respuesta.data;

    res.json({
      nombre: datos.name,
      id: datos.id,
      altura: datos.height,
      peso: datos.weight,
      tipos: datos.types.map(t => t.type.name),
      sprite: datos.sprites.front_default
    });

  } catch (error) {
    res.status(404).json({ error: 'Pokémon no encontrado 😢' });
  }
});

app.listen(port, () => {
  console.log(`🔌 Backend corriendo en http://localhost:${port}`);
});
