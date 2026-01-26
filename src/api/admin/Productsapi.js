import instance from "../Api";

export const getProducts = async () => {
  const { data } = await instance.get('/products');
  return data;
};

// CREATE a new product
export const createProduct = async (product) => {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("category", product.category);
  formData.append("price", product.price);
  formData.append("stock", product.stock);
  formData.append("condition", product.condition);

  if (product.image) {
    formData.append("image", product.image);
  }

  const { data } = await instance.post('/products', formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

// UPDATE a product
export const updateProduct = async ({ id, updatedProduct }) => {
  const formData = new FormData();
  formData.append("name", updatedProduct.name);
  formData.append("category", updatedProduct.category);
  formData.append("price", updatedProduct.price);
  formData.append("stock", updatedProduct.stock);
  formData.append("condition", updatedProduct.condition);

  if (updatedProduct.image) {
    formData.append("image", updatedProduct.image);
  }

  const { data } = await instance.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

// DELETE a product
export const deleteProduct = async (id) => {
  const { data } = await instance.delete(`/products/${id}`);
  return data;
};
