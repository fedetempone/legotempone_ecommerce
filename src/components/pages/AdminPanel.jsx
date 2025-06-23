import { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import "../../styles/admin.css";

const AdminPanel = () => {
  const {
    products,
    loading,
    error,
    createProduct,
    deleteProduct,
    updateProduct,
  } = useAdmin();

  const [editId, setEditId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [newProduct, setNewProduct] = useState({
    id: "",
    img: "",
    description: "",
    price: 0,
    stock: 0,
    detail: "",
  });
  const [showNewForm, setShowNewForm] = useState(false);

  const handleEditClick = (product) => {
    setEditId(product.id);
    setEditedData({ ...product });
  };

  const handleSave = (oldId) => {
    if (
      !editedData.id ||
      !editedData.description ||
      editedData.price <= 0
    ) {
      alert("Completa todos los campos correctamente");
      return;
    }

    updateProduct(oldId, editedData);
    setEditId(null);
  };

  const handleDelete = (id) => {
    if (confirm("¿Estás seguro que deseas eliminar este producto?")) {
      deleteProduct(id);
    }
  };

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (
      !newProduct.id ||
      !newProduct.img ||
      !newProduct.description ||
      newProduct.price <= 0
    ) {
      alert("Completa los campos obligatorios");
      return;
    }
    createProduct(newProduct);
    setNewProduct({
      id: "",
      img: "",
      description: "",
      price: 0,
      stock: 0,
      detail: "",
    });
    setShowNewForm(false);
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="admin-container">
      <h2>Panel de Administración</h2>

      <div className="admin-product-grid">
        {products.map((product) => (
          <div className="admin-product-card" key={product.id}>
            <img
              style={{ width: "auto" }}
              src={product.img}
              alt={product.description}
            />
            <p>
              <strong>ID:</strong>{" "}
              {editId === product.id ? (
                <input
                  type="text"
                  value={editedData.id}
                  onChange={(e) =>
                    setEditedData({ ...editedData, id: e.target.value })
                  }
                  className="admin-input"
                />
              ) : (
                product.id
              )}
            </p>

            {editId === product.id ? (
              <>
                <input
                  type="text"
                  value={editedData.description}
                  onChange={(e) =>
                    setEditedData({ ...editedData, description: e.target.value })
                  }
                  className="admin-input"
                />
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={editedData.price}
                  onChange={(e) =>
                    setEditedData({ ...editedData, price: Number(e.target.value) })
                  }
                  className="admin-input"
                />
                <div className="admin-btn-group">
                  <button
                    onClick={() => handleSave(product.id)}
                    className="admin-button"
                  >
                    Guardar
                  </button>
                  <button onClick={() => setEditId(null)} className="admin-button">
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>Título:</strong> {product.description}
                </p>
                <p>
                  <strong>Precio:</strong> ${product.price}
                </p>
                <div className="admin-btn-group">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="admin-button"
                  >
                    Editar
                  </button>
                  <button
                    className="admin-button admin-delete"
                    onClick={() => handleDelete(product.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="admin-create-section">
        <button
          onClick={() => setShowNewForm(!showNewForm)}
          className="admin-button"
        >
          {showNewForm ? "Cancelar" : "Agregar producto nuevo"}
        </button>

        {showNewForm && (
          <form onSubmit={handleCreate} className="admin-new-product-form">
            <input
              name="id"
              placeholder="ID único (string)"
              required
              onChange={handleNewChange}
              value={newProduct.id}
              className="admin-input"
            />
            <input
              name="img"
              placeholder="URL de imagen"
              required
              onChange={handleNewChange}
              value={newProduct.img}
              className="admin-input"
            />
            <input
              name="description"
              placeholder="Título"
              required
              onChange={handleNewChange}
              value={newProduct.description}
              className="admin-input"
            />
            <p className="admin-stock-helper">Precio:</p>
            <input
              name="price"
              type="number"
              min="0"
              placeholder="Precio"
              required
              onChange={handleNewChange}
              value={newProduct.price}
              className="admin-input"
            />
            <p className="admin-stock-helper">Stock:</p>
            <input
              name="stock"
              type="number"
              min="0"
              placeholder="Stock"
              required
              onChange={handleNewChange}
              value={newProduct.stock}
              className="admin-input"
            />
            <textarea
              name="detail"
              placeholder="Descripción detallada"
              onChange={handleNewChange}
              value={newProduct.detail}
              className="admin-textarea"
            />
            <button type="submit" className="admin-button">
              Crear
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
