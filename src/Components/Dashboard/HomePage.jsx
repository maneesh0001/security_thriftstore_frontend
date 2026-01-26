// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import Carousel from "../../Components/dashboard/Carousel";
// import ProductDetailPage from "./ProductDetailPage";
// import CheckoutPage from "./CheckoutPage";
// import { useProducts } from "../../hooks/admin/useGetProductsHook";

// const categories = [
//   "Explore",
//   "Men's Clothes",
//   "Women's Clothes",
//   "Phones",
//   "Fashion",
//   "Electronics",
//   "Toys",
//   "Sports",
//   "Bag",
// ];

// const bannerImages = [
//   "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1350&q=80",
//   "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=1350&q=80",
//   "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1350&q=80",
// ];

// const HomePage = () => {
//   const location = useLocation();
//   const { data: items = [], isLoading, error } = useProducts();

//   const [selectedCategory, setSelectedCategory] = useState("Explore");
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [buyNowItem, setBuyNowItem] = useState(null);
//   const [buyNowQuantity, setBuyNowQuantity] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     if (location.state?.searchQuery) {
//       setSearchQuery(location.state.searchQuery);
//     }
//   }, [location.state]);

//   const filteredItems = items.filter((item) => {
//     const inCategory =
//       selectedCategory === "Explore" || item.category === selectedCategory;
//     const matchesSearch = item.name
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     return inCategory && matchesSearch;
//   });

//   const handleItemClick = (item) => {
//     setSelectedItem(item);
//     setBuyNowItem(null);
//   };

//   const handleBackToHome = () => {
//     setSelectedItem(null);
//   };

//   const handleBuyNow = (item, quantity) => {
//     setBuyNowItem(item);
//     setBuyNowQuantity(quantity);
//     setSelectedItem(null);
//   };

//   if (isLoading)
//     return <p className="text-center text-lg mt-10">Loading products...</p>;
//   if (error)
//     return (
//       <p className="text-center text-red-500 mt-10">
//         Failed to load products.
//       </p>
//     );

//   if (buyNowItem) {
//     const discount = buyNowItem.discount ?? 0;
//     const checkoutItems = [
//       {
//         id: buyNowItem._id,
//         name: buyNowItem.name,
//         img: `http://localhost:5000${buyNowItem.imageUrl}`,
//         price: buyNowItem.price * (1 - discount / 100),
//         qty: buyNowQuantity,
//         condition: buyNowItem.condition || "Like New",
//         size: "M",
//         color: "N/A",
//       },
//     ];
//     return (
//       <CheckoutPage
//         initialCartItems={checkoutItems}
//         onBack={() => {
//           setBuyNowItem(null);
//           handleBackToHome();
//         }}
//       />
//     );
//   }

//   if (selectedItem) {
//     return (
//       <ProductDetailPage
//         item={selectedItem}
//         onBack={handleBackToHome}
//         onBuyNow={handleBuyNow}
//       />
//     );
//   }

//   return (
//     <>
//       <Carousel images={bannerImages} />

//       {/* Category Selector */}
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Categories</h2>
//         <div className="flex space-x-4 overflow-x-auto pb-4">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setSelectedCategory(category)}
//               className={`px-4 py-2 rounded-full text-sm font-semibold transition whitespace-nowrap ${
//                 selectedCategory === category
//                   ? "bg-pink-500 text-white shadow-md"
//                   : "bg-white text-gray-700 hover:bg-pink-200"
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Product List */}
//       <div>
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">
//           {selectedCategory} Items
//         </h2>

//         {filteredItems.length === 0 ? (
//           <p className="text-gray-500">No items available.</p>
//         ) : (
//           <motion.div
//             layout
//             className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
//           >
//             {filteredItems.map((item) => {
//               const discount = item.discount ?? 0;
//               const finalPrice = item.price * (1 - discount / 100);

//               return (
//                 <motion.div
//                   key={item._id}
//                   layout
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.3 }}
//                   className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
//                   onClick={() => handleItemClick(item)}
//                 >
//                   <img
//                     src={`http://localhost:5000${item.imageUrl}`}
//                     alt={item.name}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="p-4">
//                     <h3 className="font-bold text-lg mb-2">{item.name}</h3>
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <span className="text-pink-500 font-bold text-xl">
//                           ${finalPrice.toFixed(2)}
//                         </span>
//                         {discount > 0 && (
//                           <span className="text-gray-500 line-through ml-2">
//                             ${item.price.toFixed(2)}
//                           </span>
//                         )}
//                       </div>
//                       {discount > 0 && (
//                         <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//                           {discount}% OFF
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         )}
//       </div>
//     </>
//   );
// };

// export default HomePage;





import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Carousel from "../../Components/dashboard/Carousel";
import ProductDetailPage from "./ProductDetailPage";
import CheckoutPage from "./CheckoutPage";
import { useProducts } from "../../hooks/admin/useGetProductsHook";
import { useCart } from "../../hooks/useCartHook";
import { ShoppingCartIcon } from "lucide-react";

const categories = [
  "Explore",
  "Men's Clothes",
  "Women's Clothes",
  "Phones",
  "Fashion",
  "Electronics",
  "Toys",
  "Sports",
  "Bag",
];

const bannerImages = [
  "https://i.pinimg.com/1200x/01/e1/b5/01e1b5d5d0f545e3f21b43cac27e0879.jpg",
  "https://i.pinimg.com/736x/95/f9/16/95f916f0e120311e8c76893a412e3077.jpg",
  "https://i.pinimg.com/736x/20/73/e0/2073e00a1ef081c3b8b6f4c06c25f582.jpg",
];

const HomePage = () => {
  const location = useLocation();
  const { data: items = [], isLoading, error } = useProducts();
  const { addToCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState("Explore");
  const [selectedItem, setSelectedItem] = useState(null);
  const [buyNowItem, setBuyNowItem] = useState(null);
  const [buyNowQuantity, setBuyNowQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery);
    }
  }, [location.state]);

  const filteredItems = items.filter((item) => {
    const inCategory =
      selectedCategory === "Explore" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return inCategory && matchesSearch;
  });

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setBuyNowItem(null);
  };

  const handleBackToHome = () => {
    setSelectedItem(null);
  };

  const handleBuyNow = (item, quantity) => {
    setBuyNowItem(item);
    setBuyNowQuantity(quantity);
    setSelectedItem(null);
  };

  const handleAddToCart = (e, item) => {
    e.stopPropagation(); // Prevent card click
    addToCart(
      { productId: item._id, quantity: 1 },
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

  if (isLoading)
    return (
      <p className="text-center text-xl font-medium mt-10 text-gray-500">
        Loading products...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load products.
      </p>
    );

  if (buyNowItem) {
    const discount = buyNowItem.discount ?? 0;
    const checkoutItems = [
      {
        id: buyNowItem._id,
        name: buyNowItem.name,
        img: `http://localhost:5000${buyNowItem.imageUrl}`,
        price: buyNowItem.price * (1 - discount / 100),
        qty: buyNowQuantity,
        condition: buyNowItem.condition || "Like New",
        size: "M",
        color: "N/A",
      },
    ];
    return (
      <CheckoutPage
        initialCartItems={checkoutItems}
        onBack={() => {
          setBuyNowItem(null);
          handleBackToHome();
        }}
      />
    );
  }

  if (selectedItem) {
    return (
      <ProductDetailPage
        item={selectedItem}
        onBack={handleBackToHome}
        onBuyNow={handleBuyNow}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100 font-sans">
      {/* Hero Banner */}
      <section className="relative overflow-hidden h-[400px]">
        <Carousel images={bannerImages} />
        <div className="absolute inset-0 bg-black/01 backdrop-blur-sm flex items-center justify-center text-white text-4xl font-extrabold z-10">

        </div>
      </section>

      {/* Category Filter */}
      <section className="my-10 px-6">
        <div className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Categories
        </div>
        <div className="flex justify-center flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-300 ${selectedCategory === category
                  ? "bg-purple-600 text-white shadow-lg border-purple-700"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-purple-100"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          {selectedCategory} Collection
        </h2>

        {filteredItems.length === 0 ? (
          <p className="text-center text-gray-500">No items found.</p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {filteredItems.map((item) => {
              const discount = item.discount ?? 0;
              const finalPrice = item.price * (1 - discount / 100);

              return (
                <motion.div
                  key={item._id}
                  layout
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleItemClick(item)}
                  className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl border border-gray-100 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={`http://localhost:5000${item.imageUrl}`}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-60 object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {discount > 0 && (
                      <span className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        {discount}% OFF
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-gray-800 truncate">
                      {item.name}
                    </h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-green-600 font-bold text-lg">
                        Rs. {finalPrice.toFixed(2)}
                      </span>
                      {discount > 0 && (
                        <span className="text-gray-400 text-sm line-through">
                          Rs. {item.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => handleAddToCart(e, item)}
                      className="mt-3 w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <ShoppingCartIcon className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
