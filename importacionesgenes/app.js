const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Datos de productos con rutas de imágenes
const productos = [
  { id: 1, nombre: 'Producto 1', precio: 20.99, imagen: 'producto1.jpg' },
  { id: 2, nombre: 'Producto 2', precio: 15.49, imagen: 'producto2.jpg' },
  { id: 3, nombre: 'Producto 3', precio: 30.00, imagen: 'producto3.jpg' },
];

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'styles')));

app.get('/', (req, res) => {
  let listaProductos = '<ul>';
  productos.forEach(producto => {
    const imagenUrl = `/productos/${producto.imagen}`;
    listaProductos += `
      <li>
        <img src="${imagenUrl}" alt="${producto.nombre}" class="product-image">
        <div class="product-info">
          <span class="product-name">${producto.nombre}</span>
          <span class="product-price">$${producto.precio.toFixed(2)}</span>
        </div>
      </li>`;
  });
  listaProductos += '</ul>';
  
  const paginaHTML = `
    <html>
      <head>
        <title>Genes Importaciones</title>
        <link rel="stylesheet" type="text/css" href="/styles/styles.css">
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

app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});
