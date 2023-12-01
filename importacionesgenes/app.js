const express = require('express');
const path = require('path'); // Nuevo módulo para manejar rutas de archivos
const app = express();
const port = 3000;

// Datos de productos con rutas de imágenes
const productos = [
  { id: 1, nombre: 'Producto 1', precio: 50000, imagen: 'producto1.jpg' },
  { id: 2, nombre: 'Producto 2', precio: 50000, imagen: 'producto2.jpg' },
  { id: 3, nombre: 'Producto 3', precio: 30000, imagen: 'producto3.jpg' },
];

// Configuración para servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal que muestra la lista de productos con imágenes
app.get('/', (req, res) => {
  let listaProductos = '<ul>';
  productos.forEach(producto => {
    // Ruta de la imagen relativa al directorio 'public'
    const imagenUrl = `/productos/${producto.imagen}`;
    listaProductos += `
      <li>
        <img src="${imagenUrl}" alt="${producto.nombre}" style="width: 50px; height: 50px;">
        ${producto.nombre} - $${producto.precio.toFixed(2)}
      </li>`;
  });
  listaProductos += '</ul>';
  
  const paginaHTML = `
    <html>
      <head>
        <title>Tienda Online</title>
      </head>
      <body>
        <h1>Bienvenido a nuestra tienda online</h1>
        <h2>Productos Disponibles:</h2>
        ${listaProductos}
      </body>
    </html>
  `;

  res.send(paginaHTML);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});