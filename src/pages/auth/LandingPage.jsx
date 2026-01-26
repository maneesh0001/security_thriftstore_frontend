import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();

  const LEFT_IMAGE =
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3M3MWtwd2NoeXRseGp6dnE3NjdpdW9oM2RvcDMwaTh5YXV4emY0eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EoDLO4AGbJ5FJnTW1P/giphy.gif";
  const RIGHT_IMAGE = LEFT_IMAGE;

  return (
    <div className="font-sans bg-gradient-to-br from-[#f3f0ff] to-[#fce4ec] min-h-screen flex flex-col p-8 relative overflow-hidden">
      {/* Left Background Circle */}
      <div className="absolute w-[700px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(208,199,255,0.6),transparent)] -left-[250px] -top-[150px] z-0 flex items-center justify-center">
        <motion.img
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          src={LEFT_IMAGE}
          alt="Left"
          className="w-1/2 h-1/2 rounded-full shadow-lg"
        />
      </div>

      {/* Right Background Circle */}
      <div className="absolute w-[700px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(208,199,255,0.6),transparent)] -right-[250px] -bottom-[150px] z-0 flex items-center justify-center">
        <motion.img
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          src={RIGHT_IMAGE}
          alt="Right"
          className="w-[60%] h-[60%] rounded-full object-cover shadow-lg"
        />
      </div>

      {/* Header */}
      <header className="flex justify-between items-center mb-12 relative z-10">
        <div className="text-2xl font-bold flex items-center gap-2">
          <img src="https://img.icons8.com/ios-filled/50/panda.png" alt="Logo" className="w-6" />
          ThriftEase
        </div>
        <nav className="flex items-center gap-4">
          {["How to Use", "About Us", "Contact Us"].map((item) => (
            <a key={item} href="#" className="text-gray-700 font-medium hover:underline">
              {item}
            </a>
          ))}
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 hover:bg-gray-100 transition"
          >
            Sign In
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <section className="flex flex-1 justify-center items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center max-w-xl"
        >
          <h1 className="text-5xl font-bold mb-8 text-gray-800">
            What would you like to <span className="text-black">create today?</span>
          </h1>

          {/* Categories */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {["T-Shirt", "Hoodie", "Mug", "Cap", "Car Coaster", "Backpack", "Bag"].map((item) => (
              <button
                key={item}
                className="bg-white border border-gray-300 rounded-full px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-100 transition"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="flex justify-center mb-4">
            <input
              type="text"
              placeholder="I want a black t-shirt with a unique thrift design"
              className="px-4 py-3 rounded-l-full border border-gray-300 text-base w-full max-w-md focus:outline-none"
            />
            <button className="bg-black text-white px-6 py-3 rounded-r-full text-base hover:opacity-90 transition">
              Get Result
            </button>
          </div>

          <a href="#" className="underline text-gray-600 text-sm">
            Use My Own Design
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
