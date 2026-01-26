

import React from "react";
import { useCart } from "../../hooks/useCartHook";
import { useNavigate } from "react-router-dom";
import { ShoppingCartIcon, Trash2Icon, ArrowRightIcon } from "lucide-react";

const Cart = () => {
  const { cartItems, isLoading, isError, clearCart } = useCart();
  const navigate = useNavigate();

  if (isLoading) return <p className="text-center mt-10">Loading cart...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load cart.</p>;

  const handleCheckout = () => {
    if (!cartItems?.items?.length) {
      alert("Cart is empty");
      return;
    }
    navigate("/user/checkout");
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCartIcon className="w-8 h-8 text-pink-500" />
        <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
      </div>

      {cartItems?.items?.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
          <button
            onClick={() => navigate("/user/dashboard")}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cartItems.items.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`http://localhost:5000${item.product.image}`}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-medium text-lg text-gray-800">{item.product.name}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-pink-600 font-semibold text-lg">
                  Rs. {(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-6">
              <p className="font-bold text-2xl text-gray-800">
                Total: Rs. {cartItems.totalPrice?.toFixed(2)}
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleClearCart}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Trash2Icon className="w-5 h-5" />
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors ml-auto"
              >
                Proceed to Checkout
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
