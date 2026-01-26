import React, { useState, useEffect } from 'react';
import { Plus, Filter } from 'lucide-react';
import ProductTable from './ProductTable'; 
import AddProductModal from './AddProductModal';
import { useProducts } from '../../../hooks/admin/useGetProductsHook';

const ProductPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: products = [], isLoading, error } = useProducts();

  if (error) return <p className="text-red-500">Error loading products.</p>;

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Products</h1>
            <p className="mt-1 text-slate-500">Manage your product inventory and view their sales performance.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-700">
              <Filter size={16} />
              <span>Filter</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md text-sm"
            >
              <Plus size={16} />
              <span>Add Product</span>
            </button>
          </div>
        </header>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <ProductTable products={products} />
        )}
      </div>

      <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ProductPage;
