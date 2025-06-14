// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { getProducts } from './controllers/productController.js';

// dotenv.config();
// const port = process.env.PORT || 5000;

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Conexión a MongoDB
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log('Conectado a la base de datos'))
//   .catch((err) => {
//     console.error('Error al conectar a la base de datos:', err);
//     process.exit(1);
//   });

// // Rutas
// app.get('/api/products', getProducts);

// // Iniciar servidor
// app.listen(port, () => {
//   console.log(`Servidor corriendo en el puerto ${port}`);
// });


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { getProducts } from './controllers/productController.js';

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

const allowedOrigins = [
  'http://localhost:5173', 
  'https://ecommerce-legotempone.onrender.com' 
];


app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: acceso denegado para origen ${origin}`));
    }
  }
}));

app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  });

// Rutas
app.get('/api/products', getProducts);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
