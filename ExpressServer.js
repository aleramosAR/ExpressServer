import fs from 'fs';
import express from 'express';

const PORT = 8080;
const app = express();
const path = "productos.txt";
let productos = [];

const cargarProductos = async () => {
  try {
    productos = await fs.promises.readFile(path, "utf-8");
  } catch(err) {
    console.log(err);
  }
}

cargarProductos();


let visProds = 0;
let visRandom = 0;

const server = app.listen(PORT, () => {
  console.log(`Ya me conecte al puerto ${PORT}`);
})
server.on('error', (error) => console.log('Hay un error'))

app.get('/items', (req, res) => {
  visProds++;
  const prods = JSON.parse(productos);
  const totalProds = prods.length;

  const resultado = { items: prods, cantidad: totalProds };
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(resultado, null, 2))
})

app.get('/item-random', (req, res) => {
  visRandom++;
  const prods = JSON.parse(productos);
  const random = Math.floor(Math.random() * prods.length);

  const resultado = { item: prods[random] };
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(resultado, null, 2))
})

app.get('/visitas', (req, res) => {
  const resultado = {visitas: { items: visProds, item: visRandom }};
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(resultado, null, 2))
})


app.get('/', (req, res) => {
  res.send("<h1>Bienvenidos al servidor express</h1>");
})