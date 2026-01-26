// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../auth/AuthProvider";

// const Header = ({ userEmail }) => {
//   const navigate = useNavigate();
//   const { signOut } = useContext(AuthContext);
//   const [searchText, setSearchText] = useState("");

//   const handleLogout = () => {
//     signOut();
//   };

//   const handleSearch = (e) => {
//     if (e.key === "Enter") {
//       navigate("/user", { state: { searchQuery: searchText } });
//     }
//   };

//   return (
//     <header className="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-10">
//       <div className="flex items-center space-x-4">
//         <span className="text-pink-500 text-2xl font-bold flex items-center">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/126/126083.png"
//             alt="Logo"
//             className="w-6 h-6 mr-1"
//           />
//           ThriftEase
//         </span>
//         <span className="text-gray-700 ml-4 text-sm">Welcome, {userEmail}</span>
//       </div>

//       <input
//         type="text"
//         value={searchText}
//         onChange={(e) => setSearchText(e.target.value)}
//         onKeyDown={handleSearch}
//         placeholder="Search for treasures..."
//         className="border rounded-full px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-pink-300"
//       />

//       <div className="flex items-center space-x-4">
//         <button
//           className="relative hover:scale-105 transition-transform"
//           onClick={() => navigate("/cart")}
//         >
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/833/833314.png"
//             alt="Cart"
//             className="w-6 h-6"
//           />
//         </button>

//         <button
//           onClick={handleLogout}
//           className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;



import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";

const Header = ({ userEmail, userName, profilePicture }) => {
  const navigate = useNavigate();
  const { signOut } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");

  const handleLogout = async () => {
    await signOut();
    navigate('/login'); // Redirect to login after logout
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate("/user", { state: { searchQuery: searchText } });
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-pink-300 via-yellow-200 to-green-200 shadow-md backdrop-blur-md sticky top-0 z-10 font-nunito">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => navigate("/user/orders")}
          className="text-pink-600 text-2xl font-extrabold flex items-center hover:scale-105 transition-transform cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-lg p-2"
          title="View Orders"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/126/126083.png"
            alt="ThriftEase Logo - Click to view orders"
            className="w-8 h-8 mr-2"
          />
          <span className="bg-white px-3 py-1 rounded-lg shadow-sm">ThriftEase</span>
        </button>
        <div className="flex items-center space-x-2 ml-4">
          {profilePicture ? (
            <img
              src={`http://localhost:5000${profilePicture}`}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
              {userName?.charAt(0)?.toUpperCase() || 'U'}
            </div>
          )}
          <span className="text-gray-700 text-sm bg-white px-3 py-1 rounded-full shadow-sm">
            Welcome, {userName || userEmail}
          </span>
        </div>
      </div>

      <div className="relative w-1/3">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search for treasures..."
          className="w-full border border-pink-300 rounded-full pl-10 pr-4 py-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
          alt="search"
          className="w-5 h-5 absolute left-3 top-2.5 opacity-50"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button
          className="relative hover:scale-110 transition-transform"
          onClick={() => navigate("/user/cart")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/833/833314.png"
            alt="Cart"
            className="w-6 h-6 drop-shadow"
          />
        </button>

        <button
          className="relative hover:scale-110 transition-transform"
          onClick={() => navigate("/profile")}
          title="Profile Settings"
        >
          {profilePicture ? (
            <img
              src={`http://localhost:5000${profilePicture}`}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
              {userName?.charAt(0)?.toUpperCase() || 'U'}
            </div>
          )}
        </button>

        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-pink-400 to-pink-600 text-white px-6 py-2 rounded-full hover:scale-105 transition-all shadow-md"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
