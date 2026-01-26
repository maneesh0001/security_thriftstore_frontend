import React, { useState } from 'react';
import { useCreateProduct } from '../../../hooks/admin/useCreateProdutsHook';

const AddProductModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    condition: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  console.log('Modal render, isOpen:', isOpen);

 const createMutation = useCreateProduct((data) => {
  console.log('Mutation success:', data);
  resetForm();
  onClose();
});


  // Reset form and preview
  const resetForm = () => {
    console.log('Resetting form');
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: '',
      condition: '',
      image: null,
    });
    setImagePreview(null);
  };

  // Handle input changes for text and file
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files.length > 0) {
      const file = files[0];
      console.log('Image selected:', file);
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      console.log(`Input changed - ${name}:`, value);
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form submission started with:', formData);

    // Basic validation (optional)
    if (!formData.name || !formData.category || !formData.price || !formData.stock || !formData.condition) {
      alert('Please fill all required fields');
      console.warn('Form validation failed: missing fields');
      return;
    }

    const formPayload = new FormData();
    formPayload.append('name', formData.name);
    formPayload.append('category', formData.category);
    formPayload.append('price', formData.price ? parseFloat(formData.price) : 0);
    formPayload.append('stock', formData.stock ? parseInt(formData.stock, 10) : 0);
    formPayload.append('condition', formData.condition);
    if (formData.image) {
      formPayload.append('image', formData.image);
    }

    // Log FormData entries for inspection
    console.log('FormData to send:');
    for (let pair of formPayload.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }

createMutation.mutate({
  name: formData.name,
  category: formData.category,
  price: parseFloat(formData.price),
  stock: parseInt(formData.stock),
  condition: formData.condition,
  image: formData.image,
});  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Text Inputs */}
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

          {/* File Input */}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
          />

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Image Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-1 w-full h-40 object-contain border border-gray-200 rounded"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
              disabled={createMutation.isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              disabled={createMutation.isLoading}
            >
              {createMutation.isLoading ? 'Saving...' : 'Add'}
            </button>
          </div>

          {/* Show error message */}
          {createMutation.isError && (
            <p className="text-red-600 mt-2">{createMutation.error?.message || 'Failed to create product.'}</p>
          )}

          {/* Show success message */}
          {createMutation.isSuccess && (
            <p className="text-green-600 mt-2">Product created successfully!</p>
          )}
        </form>

        {/* Close Button (X) */}
        <button
          onClick={() => {
            resetForm();
            onClose();
          }}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold"
          disabled={createMutation.isLoading}
          aria-label="Close modal"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default AddProductModal;
