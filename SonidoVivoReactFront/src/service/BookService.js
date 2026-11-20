import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

class BookService {
  // Clientes
  getAllClientes() {
    return apiClient.get('/clientes');
  }

  getClienteById(id) {
    return apiClient.get(`/clientes/${id}`);
  }

  createCliente(cliente) {
    return apiClient.post('/clientes', cliente);
  }

  updateCliente(id, cliente) {
    return apiClient.put(`/clientes/${id}`, cliente);
  }

  deleteCliente(id) {
    return apiClient.delete(`/clientes/${id}`);
  }

  // Compatibilidad con el proyecto anterior de libros
  getAllBooks() {
    return this.getAllClientes();
  }

  getBookById(id) {
    return this.getClienteById(id);
  }

  createBook(book) {
    return this.createCliente(book);
  }

  updateBook(id, book) {
    return this.updateCliente(id, book);
  }

  deleteBook(id) {
    return this.deleteCliente(id);
  }

  // Productos
  getAllProductos() {
    return apiClient.get('/productos');
  }

  getProductoById(id) {
    return apiClient.get(`/productos/${id}`);
  }

  createProducto(producto) {
    return apiClient.post('/productos', producto);
  }

  updateProducto(id, producto) {
    return apiClient.put(`/productos/${id}`, producto);
  }

  deleteProducto(id) {
    return apiClient.delete(`/productos/${id}`);
  }
}

export default new BookService();
