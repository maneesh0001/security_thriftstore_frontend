import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Sample Data
const categories = [
  "Explore",
  "Men's Clothes",
  "Women's Clothes",
  "Phones",
  "Fashion",
  "Electronics",
  "Toys",
  "Sports",
];

const items = [
  // { category: "Men's Clothes", title: "Mens T-Shirt", img: "https://i.pinimg.com/736x/04/08/ab/0408ab6d02767e2d827f83101bfe609d.jpg", price: 19, discount: 20 },
  { category: "Electronics", title: "Laptop", img: "https://i.pinimg.com/736x/fe/f7/b3/fef7b3cbaeb59afc974ab04dd20741e6.jpg", price: 40, discount: 30 },
  { category: "Sports", title: "Air Jordan", img: "https://i.pinimg.com/736x/3a/62/1f/3a621f33ad2669f31eac898223a906d0.jpg", price: 150, discount: 15 },
  { category: "Women's Clothes", title: "Redefined Dress", img: "https://i.pinimg.com/736x/9d/ff/4b/9dff4be241c4c34b63de5737194f8779.jpg", price: 70, discount: 10 },
  { category: "Men's Clothes", title: "Classic Watch", img: "https://i.pinimg.com/736x/59/c0/75/59c0752017242d5aa456936315b82209.jpg", price: 250, discount: 5 },
  { category: "Electronics", title: "Headphones", img: "https://i.pinimg.com/736x/e4/63/5c/e4635c3d2836294a530777c5c0a1329c.jpg", price: 35, discount: 25 },
  { category: "Sports", title: "Yoga Mat", img: "https://i.pinimg.com/736x/9f/c4/73/9fc4739cc330f40d3a597a705198b85b.jpg", price: 25, discount: 10 },
  { category: "Women's Clothes", title: "Stylish Handbag", img: "https://i.pinimg.com/736x/0e/b7/4d/0eb74d257077aba6a4225de03ae355b2.jpg", price: 90, discount: 15 },
];

const PromotionDashboard = ({ userEmail, onLogout }) => {
  const bannerImages = [
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1350&q=80",
  ];

  const [currentBanner, setCurrentBanner] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Explore");
  const bannerIntervalRef = useRef(undefined);

  useEffect(() => {
    bannerIntervalRef.current = window.setInterval(() => {
      setCurrentBanner((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 3000);

    return () => {
      if (bannerIntervalRef.current) clearInterval(bannerIntervalRef.current);
    };
  }, [bannerImages.length]);

  const filteredItems = selectedCategory === "Explore" ? items : items.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-pink-100 to-blue-100">
      {/* Navbar */}
      <header className="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <span className="text-pink-500 text-2xl font-bold flex items-center">
            <img src="https://cdn-icons-png.flaticon.com/512/126/126083.png" alt="Logo" className="w-6 h-6 mr-1" />
            ThriftEase
          </span>
          <span className="text-gray-700 ml-4 text-sm">Welcome, {userEmail}</span>
        </div>
        <input
          type="text"
          placeholder="Search for treasures..."
          className="border rounded-full px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        <button onClick={onLogout} className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600">
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">
        {/* Banner */}
        <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg mb-8">
          {bannerImages.map((src, index) => (
            <motion.img
              key={src}
              src={src}
              alt={`Banner ${index + 1}`}
              className="absolute w-full h-full object-cover"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: index === currentBanner ? 1 : 0, x: index === currentBanner ? 0 : -100 }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Categories</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition whitespace-nowrap ${selectedCategory === category
                    ? "bg-pink-500 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-pink-200"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedCategory} Items</h2>
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-pink-500 font-bold text-xl">Rs. {(item.price * (1 - item.discount / 100)).toFixed(2)}</span>
                      <span className="text-gray-500 line-through ml-2">Rs. {item.price.toFixed(2)}</span>
                    </div>
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {item.discount}% OFF
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default PromotionDashboard;