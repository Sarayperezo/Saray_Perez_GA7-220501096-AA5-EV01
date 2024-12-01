import axios from "axios";

const API_URL = ("http://localhost:3000/api/clientes",form);

export const fetchClientes = () => axios.get(API_URL);
export const createCliente = (cliente) => axios.post(API_URL, cliente);
export const updateCliente = (id, cliente) => axios.put(`${API_URL}/${id}`, cliente);
export const deleteCliente = (id) => axios.delete(`${API_URL}/${id}`);
