import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";
 
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);
 
  if (loading) {
    return <div>Loading...</div>;
  }
 
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
 
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
 
  return children;
};
 
export default ProtectedRoute;