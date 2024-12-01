import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useHistory } from "react-router-dom";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const handleNormalLogin = async () => {
    // Validate inputs
    if (!email.trim()) {
      setError("Please enter an email address");
      return;
    }

    if (!password.trim()) {
      setError("Please enter a password");
      return;
    }

    try {
      // Trim whitespace from email
      const trimmedEmail = email.trim();

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        setError("Please enter a valid email address");
        return;
      }

      await signInWithEmailAndPassword(auth, trimmedEmail, password);
      history.push("/home");
    } catch (err: any) {
      setError(err.code);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      history.push("/home");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      history.push("/home");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    handleNormalLogin,
    handleGoogleSignIn,
    handleFacebookSignIn,
  };
};
