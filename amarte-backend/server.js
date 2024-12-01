const express = require('express');
const app = express();
const PORT = 3000;


const cors = require('cors');
app.use(cors());

// Middleware para procesar JSON
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente.');
});

// Simulación de la API de clientes
app.get('/api/clientes', (req, res) => {
  res.json([{ id: 1, nombre: 'Cliente 1', email: 'cliente1@example.com' }]);
});

app.post('/api/clientes', (req, res) => {
  const nuevoCliente = req.body;
  console.log('Cliente recibido:', nuevoCliente);
  res.status(201).send('Cliente agregado correctamente.');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
