import instance from "../Api";


export const addToCartApi = (product) => {
  return instance.post("/cart", product);
};

export const getCartApi = () => {
  return instance.get("/cart");
};

export const clearCartApi = () => {
  return instance.delete("/cart/clear");
};
