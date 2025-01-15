import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useHistory } from "react-router-dom";

export const useLogout = () => {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      history.push("/login");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return { handleLogout };
};