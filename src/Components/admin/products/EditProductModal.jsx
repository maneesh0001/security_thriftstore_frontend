// FILE: src/components/EditProductModal.jsx
import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '../../../api/Api';

const updateProductApi = async ({ id, formData }) => {
  const { data } = await instance.put(`/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

const EditProductModal = ({ isOpen, onClose, product }) => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    condition: '',
    image: null,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || '',
        price: product.price?.toString() || '',
        stock: product.stock?.toString() || '',
        condition: product.condition || '',
        image: null,
      });
    }
  }, [product]);

  const mutation = useMutation({
    mutationFn: updateProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      onClose();
    },
    onError: (error) => {
      alert('Failed to update product: ' + error.message);
    },
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('category', formData.category);
    payload.append('price', parseFloat(formData.price));
    payload.append('stock', parseInt(formData.stock, 10));
    payload.append('condition', formData.condition);
    if (formData.image) {
      payload.append('image', formData.image);
    }

    mutation.mutate({ id: product._id, formData: payload });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['name', 'category', 'price', 'stock', 'condition'].map((field) => (
            <input
              key={field}
              type={field === 'price' || field === 'stock' ? 'number' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
              required
              min={field === 'price' || field === 'stock' ? 0 : undefined}
              step={field === 'price' ? '0.01' : undefined}
            />
          ))}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
          />
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
              disabled={mutation.isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
          {mutation.isError && (
            <p className="text-red-600 mt-2">{mutation.error.message || 'Failed to update product.'}</p>
          )}
          {mutation.isSuccess && (
            <p className="text-green-600 mt-2">Product updated successfully!</p>
          )}
        </form>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold"
          disabled={mutation.isLoading}
          aria-label="Close modal"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default EditProductModal;
