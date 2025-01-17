import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  AuthProvider,
} from "firebase/auth";
import { useHistory } from "react-router-dom";
import { auth } from "../firebaseConfig";

export const useLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const validateEmail = (email: string): boolean => {
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(trimmedEmail);
  };

  const handleAuthError = (err: any) => {
    switch (err.code) {
      case "auth/user-not-found":
        setError("No user found with this email.");
        break;
      case "auth/wrong-password":
        setError("Incorrect password.");
        break;
      case "auth/account-exists-with-different-credential":
        setError(
          "This email is already registered with a different sign-in method. Please use that method."
        );
        break;
      default:
        setError(err.message || "An unexpected error occurred.");
    }
  };

  const handleEmailLogin = async () => {
    setError(null);

    if (!email.trim()) {
      setError("Please enter an email address.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter a password.");
      return;
    }

    const trimmedEmail = email.trim();
    if (!validateEmail(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, trimmedEmail, password);
      history.push("/home");
    } catch (err: any) {
      handleAuthError(err);
    }
  };

  const handleSocialLogin = async (authProvider: AuthProvider) => {
    setError(null);

    try {
      // Sign in with the selected provider
      const result = await signInWithPopup(auth, authProvider);

      // Redirect to /home after successful social login
      console.log("Social login successful!");
      history.push("/home");
    } catch (err: any) {
      handleAuthError(err);
    }
  };

  const triggerSocialLogin = (providerType: string) => {
    let authProvider: AuthProvider;

    switch (providerType) {
      case "Google":
        authProvider = new GoogleAuthProvider();
        break;
      case "Facebook":
        authProvider = new FacebookAuthProvider();
        break;
      default:
        setError("Unsupported authentication provider.");
        return;
    }

    // Perform social login
    handleSocialLogin(authProvider);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin: handleEmailLogin,
    triggerSocialLogin,
  };
};
