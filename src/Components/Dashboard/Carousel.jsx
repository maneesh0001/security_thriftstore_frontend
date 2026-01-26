// import React, { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";

// const Carousel = ({ images }) => {
//   const [current, setCurrent] = useState(0);
//   const intervalRef = useRef();

//   useEffect(() => {
//     intervalRef.current = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % images.length);
//     }, 3000);

//     return () => clearInterval(intervalRef.current);
//   }, [images.length]);

//   return (
//     <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg mb-8">
//       {images.map((src, index) => (
//         <motion.img
//           key={src}
//           src={src}
//           alt={`Banner ${index + 1}`}
//           className="absolute w-full h-full object-cover"
//           initial={{ opacity: 0, x: 100 }}
//           animate={{ opacity: index === current ? 1 : 0, x: index === current ? 0 : -100 }}
//           transition={{ duration: 0.5 }}
//         />
//       ))}
//     </div>
//   );
// };

// export default Carousel;




import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Carousel = ({ images, interval = 4000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={`Slide ${index + 1}`}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0 }}
        />
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2 z-20">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              index === i ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
