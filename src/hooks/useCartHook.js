// src/hooks/useCartHook.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CartService } from "../services/cartService";

export const useCart = () => {
  const queryClient = useQueryClient();

  // Fetch cart items
  const {
    data: cartItems,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: CartService.fetchCart,
  });

  // Add to cart
  const addToCartMutation = useMutation({
    mutationFn: CartService.addItemToCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  // Clear cart
  const clearCartMutation = useMutation({
    mutationFn: CartService.clearUserCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  return {
    cartItems,
    isLoading,
    isError,
    refetch,
    addToCart: addToCartMutation.mutate,
    clearCart: clearCartMutation.mutate,
  };
};
