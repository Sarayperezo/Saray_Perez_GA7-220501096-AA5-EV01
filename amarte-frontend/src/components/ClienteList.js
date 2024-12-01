import React, { useState, useEffect } from "react";
import axios from "axios";

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({ nombre: "", email: "" });

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    const response = await axios.get("http://localhost:3000/api/clientes"); // Cambia por tu API
    setClientes(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/api/clientes", form);
    fetchClientes();
    setForm({ nombre: "", email: "" });
  };

  return (
    <div>
      <h2>Gestión de Clientes</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button type="submit">Agregar Cliente</button>
      </form>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            {cliente.nombre} - {cliente.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClienteList;
