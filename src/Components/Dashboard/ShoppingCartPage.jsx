// src/pages/ShoppingCartPage.jsx
import React, { useState, useEffect } from "react";

const ShoppingCartPage = ({ onProceedToCheckout, onContinueShopping }) => {
  // Sample cart items. In a real application, this would come from a global state (e.g., context, Redux)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Vintage Levi's Denim Jacket",
      img: "https://placehold.co/100x100/e0e0e0/000000?text=Jacket",
      condition: "Like New",
      size: "M",
      color: "Classic Blue",
      price: 45.00,
      quantity: 1,
    },
    {
      id: 2,
      name: "High-Waisted Mom Jeans",
      img: "https://placehold.co/100x100/e0e0e0/000000?text=Jeans",
      condition: "Gently Used",
      size: "L",
      color: "Light Wash",
      price: 32.00, // Price per item
      quantity: 2,
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const shippingFee = 0; // As per image, "FREE"
  const taxRate = 0.08; // Example tax rate (8%)

  // Calculate order summary details
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + shippingFee + tax;

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) } // Ensure quantity doesn't go below 1
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleApplyPromo = () => {
    // Implement promo code application logic here
    console.log("Applying promo code:", promoCode);
    alert(`Promo code "${promoCode}" applied! (Placeholder)`); // Replace with actual logic
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Left Column: Cart Items List */}
        <div className="lg:w-2/3 space-y-6 mb-8 lg:mb-0">
          {cartItems.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-600">
              Your cart is empty.
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex items-start space-x-4">
                {/* Item Image */}
                <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
                  <img src={item.img} alt={item.name} className="object-cover w-full h-full" />
                </div>

                {/* Item Details and Controls */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-lg text-gray-900">{item.name}</p>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    {item.condition && (
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${item.condition === "Like New" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                        }`}>
                        {item.condition}
                      </span>
                    )}
                    <p className="text-sm text-gray-600 mt-1">
                      Size: {item.size} • Color: {item.color}
                    </p>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded-l-md"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 border-l border-r border-gray-300 text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded-r-md"
                      >
                        +
                      </button>
                    </div>
                    {/* Price */}
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-900">
                        Rs. {(item.price * item.quantity).toFixed(2)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-gray-500">
                          Rs. {item.price.toFixed(2)} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Column: Order Summary and Actions */}
        <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>
          <div className="space-y-2 text-gray-700 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">Rs. {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-medium">{shippingFee === 0 ? "FREE" : `Rs. ${shippingFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span className="font-medium">Rs. {tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-300 pt-2 mt-2">
              <span>Total</span>
              <span>Rs. {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Promo Code Input */}
          <div className="mb-6 border-t border-gray-200 pt-4">
            <h3 className="font-semibold text-gray-800 mb-2">Promo Code</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Enter code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900 bg-gray-50 placeholder-gray-500"
              />
              <button
                onClick={handleApplyPromo}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <button
            onClick={onProceedToCheckout} // Prop for external navigation
            className="w-full bg-emerald-500 text-white py-3 rounded-md font-semibold hover:bg-emerald-600 transition-colors shadow-md mb-3"
          >
            Proceed to Checkout
          </button>
          <button
            onClick={onContinueShopping} // Prop for external navigation
            className="w-full bg-white text-gray-700 border border-gray-300 py-3 rounded-md font-semibold hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;