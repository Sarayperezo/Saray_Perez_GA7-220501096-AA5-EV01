const express = require("express"); 
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración de la base de datos
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "", // Cambia esto si tienes contraseña en MySQL
  database: "amarte_estudio",
  port: 3307, // Cambia si usas un puerto diferente
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Conectado a la base de datos MySQL");
  }
});

// Endpoints

// Obtener todos los clientes
app.get("/api/clientes", (req, res) => {
  const query = "SELECT * FROM clientes";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send({ error: "Error al obtener los clientes" });
    } else {
      res.json(results);
    }
  });
});

// Obtener un cliente por ID
app.get("/api/clientes/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM clientes WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send({ error: "Error al obtener el cliente" });
    } else if (results.length === 0) {
      res.status(404).send({ error: "Cliente no encontrado" });
    } else {
      res.json(results[0]);
    }
  });
});

// Crear un cliente
app.post("/api/clientes", (req, res) => {
  const { nombre, email } = req.body;
  const query = "INSERT INTO clientes (nombre, email) VALUES (?, ?)";
  db.query(query, [nombre, email], (err, results) => {
    if (err) {
      res.status(500).send({ error: "Error al crear el cliente" });
    } else {
      res.status(201).send({ mensaje: "Cliente creado con éxito" });
    }
  });
});

// Actualizar un cliente
app.put("/api/clientes/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  const query = "UPDATE clientes SET nombre = ?, email = ? WHERE id = ?";
  db.query(query, [nombre, email, id], (err, results) => {
    if (err) {
      res.status(500).send({ error: "Error al actualizar el cliente" });
    } else if (results.affectedRows === 0) {
      res.status(404).send({ error: "Cliente no encontrado" });
    } else {
      res.send({ mensaje: "Cliente actualizado con éxito" });
    }
  });
});

// Eliminar un cliente
app.delete("/api/clientes/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM clientes WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send({ error: "Error al eliminar el cliente" });
    } else if (results.affectedRows === 0) {
      res.status(404).send({ error: "Cliente no encontrado" });
    } else {
      res.send({ mensaje: "Cliente eliminado con éxito" });
    }
  });
});

// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).send("Endpoint no encontrado");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
