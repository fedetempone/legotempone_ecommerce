import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/auth.js";
import path from "path";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://ecommerce-legotempone.onrender.com",
];

// configuro cors para que no me bloquee las solicitudes
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy: acceso denegado para origen ${origin}`));
      }
    },
  })
);

app.use(express.json());

// conexion am i base de datos en MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a la base de datos"))
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
    process.exit(1);
  });

// creacion de rutas
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// las siguientes 3 lineas de codigo (app.use expres / app.get * req res / res.sendfile) son para que al actualizar el deploy de render
// o para ingresar directamente a una ruta /products o /contact ol o que sea, no me tire 404
// sirvo los archivos estaticos desde dist (esto es para ver si funciona en produccion)
app.use(express.static(path.resolve("./dist")));
// para cualquier ruta que no sea API, devuelvo index.html para que React Router maneje el enrutamiento (esto tmbn es para produccion)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.resolve("./dist/index.html"));
});

// prendo el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
