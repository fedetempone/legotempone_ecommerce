import mongoose from "mongoose";

// Este es mi esquema para los productos que van a estar en la base de datos de mongodb
// la base de datos cuando la creo tiene que coincidir id img description, price, s tock y detail, si hay discrepancias
// no va a funcionar.
const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    detail: { 
      type: String,
      required: false,
      default: "",
    },
},
{
  collection: 'LegoProducts' 
});

// con esta linea creo el esquema.
const Product = mongoose.model("Product", productSchema);

export default Product;
