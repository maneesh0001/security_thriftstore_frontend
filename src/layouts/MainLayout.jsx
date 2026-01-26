import React from "react";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Dashboard/Header";
import { AuthContext } from "../auth/AuthProvider";

export default function MainLayout() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Header userEmail={user?.email} userName={user?.name} profilePicture={user?.profilePicture} />
      <main>
        <Outlet />
      </main>
    {/* add a footer here  */}
    </div>
  );
}


