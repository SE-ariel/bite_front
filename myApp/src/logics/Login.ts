import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  AuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { useHistory } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";

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

  const handleSocialLogin = async (providerType: string) => {
    setError(null);
    try {
      // First sign out if there's an existing session
      const currentUser = await FirebaseAuthentication.getCurrentUser();
      if (currentUser?.user) {
        await FirebaseAuthentication.signOut();
      }
      if (providerType === "Google") {
        // Perform Google sign in
        const result = await FirebaseAuthentication.signInWithGoogle({
          skipNativeAuth: false,
        });
        if (result?.user) {
          console.log("Google sign in successful:", result.user);
  
          // Manually update Firebase Auth state
          if (!result.credential?.idToken) {
            throw new Error("No ID token returned from Google sign in");
          }
          const credential = GoogleAuthProvider.credential(result.credential.idToken);
          await signInWithCredential(auth, credential);
  
          console.log("user:", auth.currentUser);
          // Only navigate after successful authentication
          history.push("/home");
          history.go(0);
        } else {
          throw new Error("No user data returned from Google sign in");
        }
      }
      if (providerType === "Facebook") {
        console.log("Attempting Facebook sign in");
        // Perform Facebook sign in
        const result = await FirebaseAuthentication.signInWithFacebook({
          skipNativeAuth: false,
        });
        console.log("Facebook sign in result:", result);
  
        if (result?.user) {
          console.log("Facebook sign in successful:", result.user);
  
          // Manually update Firebase Auth state
          if (!result.credential?.accessToken) {
            throw new Error("No access token returned from Facebook sign in");
          }
          const credential = FacebookAuthProvider.credential(result.credential.accessToken);
          await signInWithCredential(auth, credential);
  
          console.log("Firebase Auth user:", auth.currentUser);
          // Only navigate after successful authentication
          history.push("/home");
          history.go(0);
        } else {
          throw new Error("No user data returned from Facebook sign in");
        }
      }
    } catch (error) {
      console.error("Social login error:", error);
      setError(
        error instanceof Error ? error.message : "Authentication failed"
      );
    }
  };

  const triggerSocialLogin = (providerType: string) => {
    handleSocialLogin(providerType);
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
