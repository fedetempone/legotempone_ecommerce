import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/auth.js";

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

// prendo el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
