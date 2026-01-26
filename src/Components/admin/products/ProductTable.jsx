import React, { useState } from "react";
import { MoreHorizontal, Trash2, Edit } from "lucide-react";
import useDeleteProduct from "../../../hooks/admin/useDeleteProductsHook";
import EditProductModal from "./EditProductModal";

const BACKEND_URL = "http://localhost:5000"; // update for production

const ProductTable = ({ products }) => {
  const { mutate: deleteProduct, isLoading: isDeleting } = useDeleteProduct();

  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingProduct(null);
    setIsEditModalOpen(false);
  };

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
    }
  };

  const ProductRow = ({ product }) => (
    <tr className="border-b border-slate-200 hover:bg-slate-50">
      <td className="p-4">
        <div className="flex items-center gap-4">
          <img
            src={`${BACKEND_URL}${product.imageUrl}`}
            alt={product.name}
            className="w-12 h-12 object-cover rounded-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/100x100/cccccc/ffffff?text=Error";
            }}
          />
          <span className="font-medium text-slate-800">{product.name}</span>
        </div>
      </td>
      <td className="p-4 text-slate-600">{product.category}</td>
      <td className="p-4 text-slate-600">Rs. {product.price.toFixed(2)}</td>
      <td className="p-4 text-center flex justify-center gap-2">
        <button
          className="p-2 rounded-full hover:bg-slate-200"
          title="Edit product"
          onClick={() => openEditModal(product)}
          disabled={isDeleting}
        >
          <Edit size={20} className="text-slate-500" />
        </button>

        <button
          className="p-2 rounded-full hover:bg-red-200 text-red-600"
          title="Delete product"
          disabled={isDeleting}
          onClick={() => handleDelete(product._id || product.id)}
        >
          <Trash2 size={20} className="text-red-600" />
        </button>
      </td>
    </tr>
  );

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden relative">
      <img
        src={`${BACKEND_URL}${product.imageUrl}`}
        alt={product.name}
        className="w-full h-40 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/400x400/cccccc/ffffff?text=Error";
        }}
      />
      <div className="p-4">
        <h3 className="font-semibold text-slate-800">{product.name}</h3>
        <p className="text-sm text-slate-500 mt-1">{product.category}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="font-bold text-indigo-600">Rs. {product.price.toFixed(2)}</p>
          <div className="flex gap-2">
            <button
              className="p-2 rounded-full hover:bg-slate-200 text-slate-500"
              title="Edit product"
              onClick={() => openEditModal(product)}
              disabled={isDeleting}
            >
              <Edit size={20} />
            </button>

            <button
              className="p-2 rounded-full hover:bg-red-200 text-red-600"
              title="Delete product"
              disabled={isDeleting}
              onClick={() => handleDelete(product._id || product.id)}
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-6">
      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm border border-slate-200">
        <table className="w-full">
          <thead className="border-b border-slate-200">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="p-4 text-left text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Category
              </th>
              <th className="p-4 text-left text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Price
              </th>
              <th className="p-4 text-center text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductRow key={product._id || product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>

      {/* Edit Product Modal */}
      {isEditModalOpen && (
        <EditProductModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          product={editingProduct}
        />
      )}
    </div>
  );
};

export default ProductTable;
