// // FILE: pages/ProductDetailPage.jsx

// import React, { useState } from "react";

// const ProductDetailPage = ({ item, onBack, onBuyNow }) => {
//   const [quantity, setQuantity] = useState(1);
//   const discount = item.discount ?? 0;
//   const discountedPrice = item.price * (1 - discount / 100);

//   const handleBuyNowClick = () => {
//     if (quantity > item.stock) {
//       alert("Quantity exceeds available stock");
//       return;
//     }
//     onBuyNow(item, quantity);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       {/* Back Button */}
//       <button
//         onClick={onBack}
//         className="mb-4 text-sm text-pink-600 hover:underline"
//       >
//         ← Back to Home
//       </button>

//       <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow-lg">
//         {/* Product Image */}
//         <div className="flex-1">
//           <img
//             src={`http://localhost:5000${item.imageUrl}`}
//             alt={item.name}
//             className="w-full h-80 object-cover rounded-lg"
//           />
//         </div>

//         {/* Product Details */}
//         <div className="flex-1 space-y-4">
//           <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>
//           <p className="text-sm text-gray-600">Category: {item.category}</p>
//           <p className="text-sm text-gray-600">Condition: {item.condition}</p>
//           <p className="text-sm text-gray-600">Available Stock: {item.stock}</p>

//           {/* Price with discount */}
//           <div className="text-xl font-semibold text-pink-600">
//             ${discountedPrice.toFixed(2)}
//             {discount > 0 && (
//               <span className="text-gray-500 text-sm line-through ml-2">
//                 ${item.price.toFixed(2)}
//               </span>
//             )}
//           </div>

//           {/* Quantity Input */}
//           <div className="flex items-center gap-2 mt-2">
//             <label htmlFor="quantity" className="text-sm font-medium">
//               Quantity:
//             </label>
//             <input
//               id="quantity"
//               type="number"
//               value={quantity}
//               min={1}
//               max={item.stock}
//               onChange={(e) => setQuantity(parseInt(e.target.value))}
//               className="w-20 border border-gray-300 rounded px-2 py-1"
//             />
//           </div>

//           {/* Buy Now Button */}
//           <button
//             onClick={handleBuyNowClick}
//             className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded"
//           >
//             Buy Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailPage;




// src/pages/ProductDetailPage.jsx
import React, { useState } from "react";
import { useCart } from "../../hooks/useCartHook";
import { ShoppingCartIcon } from "lucide-react";

const ProductDetailPage = ({ item, onBack, onBuyNow }) => {
  const [quantity, setQuantity] = useState(1);
  const discount = item.discount ?? 0;
  const discountedPrice = item.price * (1 - discount / 100);

  const { addToCart } = useCart();

  const handleBuyNowClick = () => {
    if (quantity > item.stock) {
      alert("Quantity exceeds available stock");
      return;
    }

    // Navigate to checkout page with product details
    if (onBuyNow) {
      onBuyNow(item, quantity);
    }
  };


  const handleAddToCart = () => {
    addToCart(
      { productId: item._id, quantity },
      {
        onSuccess: () => {
          alert("Added to cart!");
        },
        onError: (error) => {
          alert("Failed to add to cart: " + error.message);
        },
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button onClick={onBack} className="mb-4 text-sm text-pink-600 hover:underline">
        ← Back to Home
      </button>

      <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow-lg">
        <div className="flex-1">
          <img
            src={`http://localhost:5000${item.imageUrl}`}
            alt={item.name}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>

        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>
          <p className="text-sm text-gray-600">Category: {item.category}</p>
          <p className="text-sm text-gray-600">Condition: {item.condition}</p>
          <p className="text-sm text-gray-600">Available Stock: {item.stock}</p>

          <div className="text-xl font-semibold text-pink-600">
            Rs. {discountedPrice.toFixed(2)}
            {discount > 0 && (
              <span className="text-gray-500 text-sm line-through ml-2">
                Rs. {item.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <label htmlFor="quantity" className="text-sm font-medium">
              Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              min={1}
              max={item.stock}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20 border border-gray-300 rounded px-2 py-1"
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleBuyNowClick}
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded"
            >
              Buy Now
            </button>

            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 border border-pink-500 text-pink-500 hover:bg-pink-50 font-semibold px-4 py-2 rounded"
            >
              <ShoppingCartIcon /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
