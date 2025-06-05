import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const stored = JSON.parse(localStorage.getItem("products"));
                const localProduct = stored?.find(p => p.id === id);

                if (localProduct) {
                    setProduct(localProduct);
                    setLoading(false);
                } else {
                    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
                    setProduct(res.data);
                    setLoading(false);
                }
            } catch (err) {
                setError("Error al cargar el producto");
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <p>Cargando producto...</p>;
    if (error) return <p>{error}</p>;
    if (!product) return <p>Producto no encontrado</p>;

    return (
        <>
            <div className="product-detail-container">
                <img src={product.img} alt={product.description} />
                <h2>{product.description}</h2>
                <p>Precio: ${product.price}</p>
                <p>{product.category}</p>
                <p>{product.details || "POR EL MOMENTO NO LE PUSE DESCRIPCION, LUEGO LE AGREGO UNA DESCRIPCION TOMADA DIRECTAMENTE DE LA BASE DE DATOS, A TRAVES DE SU ID"}</p>
                <div className="quantity-controls">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <input type="number" value={quantity} min="1" readOnly />
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <button
                    className="add-to-cart-button"
                    onClick={() => {
                        const cart = JSON.parse(localStorage.getItem("cart")) || [];
                        const existing = cart.find((item) => item.id === product.id);
                        if (existing) {
                            existing.quantity += quantity;
                        } else {
                            cart.push({ ...product, quantity });
                        }
                        localStorage.setItem("cart", JSON.stringify(cart));
                        navigate("/cart");
                    }}
                >
                    Añadir al carrito
                </button>
            </div>
        </>
    );
};

export default ProductDetail; 
