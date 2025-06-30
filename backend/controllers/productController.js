import Product from '../models/productModel.js';
import localProducts from '../data/products.js';

// obtengo productos de la base de datos a traves de productModel, este ultimo tiene todos los productos definidos 
// como funciona : al operar con node.js puedo hacer la peticion para obtener los productos a traves de Product.find() 
// propia de la liberria mongoose, si encuentra productos entonces arroja q los productos se obtuvieron de la base de datos
// si no encuentra nada o esta vacia tira un warn y va a buscar los productos al localstorage
// y si tampoco los encuentra entonces va a buscar los productos en el fallback dentro de products.js
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length > 0) {
      console.log("✅ Productos obtenidos desde MongoDB");
      return res.status(200).json({ source: "mongo", products });
    } else {
      console.warn("⚠️ se cargan los productos de forma local, al no poder obtener desde mongo.");
      console.log("✅ Productos obtenidos Localmente");
      return res.status(200).json({ source: "local", products: localProducts });
    }
  } catch (error) {
    // console.error("❌ Error al consultar MongoDB:", error);
    return res.status(200).json({ source: "fallback", products: localProducts });
  }
};

// esta funcion crea un nuevo producto en la base de datos 
export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    // console.error("❌ Error al crear producto:", err.message);
    res.status(400).json({ error: "Error al crear producto", details: err.message });
  }
};

// esta funcion edita un producto en la base de datos
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Product.findOneAndUpdate({ id }, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(updated);
  } catch (err) {
    // console.error("❌ Error al actualizar producto:", err.message);
    res.status(400).json({ error: 'Error al actualizar producto', details: err.message });
  }
};

// esta funcion borra definitivamente un producto de la base de datos
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Product.findOneAndDelete({ id });
    if (!deleted) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    // console.error("❌ Error al eliminar producto:", err.message);
    res.status(400).json({ error: 'Error al eliminar producto', details: err.message });
  }
};

// en resumen este controlador o controller, tiene la logica de las funciones que invoca el adminpanel, a su vez el adminpanel ejecuta
// la funcion createProduct(newProduct) esta funcion viene del adminContext.jsx, el admincontext ejecuta su funcion de createProduct
// esta ultima lo que hace es enviar una peticion http post a la ruta api/products del backend y le manda el producto que se quiere agregar
// mas el token de autenticacion, recibe la respuesta del backend y agrega el nuevo producto, PERO esta ruta esta protegida por un middleware
// en el componet productRoutes, el cual ejecuta primero el autmiddleware quien verifica que le token sea valido y luego ejecuta la 
// funcion createProduct del productController.js, y ahora intenta guardar el producto en la base de datos, si todo va bien responde
// con el producto creado en json, el frontend en admincontext recibe esa respuesta y actualiza el estado de setproducts para mostrar
// el nuevo producto que colocó al final del array.