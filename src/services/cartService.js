// src/services/cart/cartService.js
import { addToCartApi, getCartApi, clearCartApi } from "../api/user/cartApi";

export const CartService = {
  addItemToCart: async (item) => {
    const response = await addToCartApi(item);
    return response.data;
  },

  fetchCart: async () => {
    const response = await getCartApi();
    return response.data;
  },

  clearUserCart: async () => {
    const response = await clearCartApi();
    return response.data;
  },
};
