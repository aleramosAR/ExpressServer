import fs from 'fs';
import express from 'express';

const PORT = 8080;
const app = express();
const path = "productos.txt";
let productos = [];

// Carga de productos desde el TXT
const cargarProductos = async () => {
  try {
    productos = await fs.promises.readFile(path, "utf-8");
  } catch(err) {
    console.log(err);
  }
}

cargarProductos();


// Variables para guardar la cantidad de visualizaciones de Productos y Producto Random
let visProds = 0;
let visRandom = 0;

// Conexion a server con callback avisando de conexion exitosa
const server = app.listen(PORT, () => {
  console.log(`Ya me conecte al puerto ${PORT}`);
})
server.on('error', (error) => console.log('Hay un error'))

// Ruta /items
// Parseo el listado de productos para tener el listado y cantidad
// Devuelvo listado de productos y cantidad
app.get('/items', (req, res) => {
  visProds++;
  const prods = JSON.parse(productos);
  const totalProds = prods.length;

  const resultado = { items: prods, cantidad: totalProds };
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(resultado, null, 2))
})

// Ruta /item-random
// Parseo el listado de productos y selecciono uno al azar.
app.get('/item-random', (req, res) => {
  visRandom++;
  const prods = JSON.parse(productos);
  const random = Math.floor(Math.random() * prods.length);

  const resultado = { item: prods[random] };
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(resultado, null, 2))
})

// Ruta /visitas
// Devuelvo un JSON con el total de visitas a Productos y Producto Random
app.get('/visitas', (req, res) => {
  const resultado = {visitas: { items: visProds, item: visRandom }};
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(resultado, null, 2))
})

// Ruta /
// Devuelvo un pequeño HTML dando la bienvenida a la aplicacion.
app.get('/', (req, res) => {
  res.send("<h1>Bienvenidos al servidor express</h1>");
})