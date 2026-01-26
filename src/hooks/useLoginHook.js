import { useNavigate, } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { loginService } from "../services/authService";
import { roleRoutes } from "../../utils/roleRoutes";

const useLoginHook = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginService,
    mutationKey: ["Login"],
    onSuccess: (data) => {
      console.log("Login success:", data);

      const { user } = data; // No token needed - using session cookies

      signIn(user); // Pass only user data

      const route = roleRoutes[user?.role];
      navigate(route);
    },
    onError: (err) => {
      console.log(err.message)
    },
  });
};

// export const useLogoutTan = () => {
//   const { signOut } = useContext(AuthContext);
//   const navigate = useNavigate();

//   return useMutation({
//     mutationFn: logoutUserService,
//     mutationKey: ["Logout"],

//     onSuccess: (data) => {
//       console.log("Logout success:", data.message);

//       signOut();

//       navigate('/login');
//     },

//     onError: (err) => {
//       console.error("Logout failed:", err.message);
//     },
//   });
// };

export default useLoginHook;