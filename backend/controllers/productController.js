// import Product from '../models/productModel.js';
// import localProducts from '../data/products.js';

// export const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find();

//     if (products.length > 0) {
//       console.log("✅ Productos obtenidos desde MongoDB");
//       return res.status(200).json({ source: "mongo", products });
//     } else {
//       console.warn("⚠️ MongoDB está vacía, devolviendo productos locales.");
//       console.log("✅ Productos obtenidos Localmente");
//       return res.status(200).json({ source: "local", products: localProducts });
//     }
//   } catch (error) {
//     console.error("❌ Error al consultar MongoDB:", error);
//     return res.status(200).json({ source: "fallback", products: localProducts });
//   }
// };

import Product from '../models/productModel.js';
import localProducts from '../data/products.js';

// GET
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length > 0) {
      console.log("✅ Productos obtenidos desde MongoDB");
      return res.status(200).json({ source: "mongo", products });
    } else {
      console.warn("⚠️ MongoDB está vacía, devolviendo productos locales.");
      console.log("✅ Productos obtenidos Localmente");
      return res.status(200).json({ source: "local", products: localProducts });
    }
  } catch (error) {
    console.error("❌ Error al consultar MongoDB:", error);
    return res.status(200).json({ source: "fallback", products: localProducts });
  }
};

// POST
export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("❌ Error al crear producto:", err.message);
    res.status(400).json({ error: "Error al crear producto", details: err.message });
  }
};

// PUT
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Product.findOneAndUpdate({ id }, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(updated);
  } catch (err) {
    console.error("❌ Error al actualizar producto:", err.message);
    res.status(400).json({ error: 'Error al actualizar producto', details: err.message });
  }
};

// DELETE
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Product.findOneAndDelete({ id });
    if (!deleted) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    console.error("❌ Error al eliminar producto:", err.message);
    res.status(400).json({ error: 'Error al eliminar producto', details: err.message });
  }
};
