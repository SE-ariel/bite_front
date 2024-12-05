import {
  AuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { auth, db } from "../firebaseConfig";

interface AuthHookOptions {
  additionalUserInfo?: {
    firstName?: string;
    surName?: string;
    role?: string;
  };
}

export const useAuth = (options: AuthHookOptions = {}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [provider, setProvider] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [shouldLogin, setShouldLogin] = useState(false);
  const history = useHistory();

  const validateEmail = (email: string): boolean => {
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(trimmedEmail);
  };

  const addUserInfo = async () => {
    const { firstName, surName, role } = options.additionalUserInfo || {};
    const user = auth.currentUser;

    if (!user || (!firstName && !surName && !role)) return;

    try {
      const userinfo = doc(db, "users", user.uid);
      const infoToAdd: Record<string, string> = {};

      if (firstName) infoToAdd["firstName"] = firstName;
      if (surName) infoToAdd["surName"] = surName;
      if (role) infoToAdd["role"] = role;
      if (email) infoToAdd["email"] = email;
      infoToAdd["savedRecipes"] = "";

      await setDoc(userinfo, infoToAdd, { merge: true });
    } catch (err: any) {
      setError(err.code);
    }
  };

  useEffect(() => {
    const performLogin = async () => {
      if (!shouldLogin) return;

      try {
        if (provider !== "") {
          let authProvider: AuthProvider;

          switch (provider) {
            case "Facebook":
              authProvider = new FacebookAuthProvider();
              break;
            case "Google":
              authProvider = new GoogleAuthProvider();
              break;
            default:
              throw new Error("Unsupported authentication provider");
          }

          try {
            await signInWithPopup(auth, authProvider);
          } catch (err: any) {
            // Handle popup closure or other auth errors
            if (err.code === "auth/popup-closed-by-user") {
              // Reset the provider to allow future attempts
              setProvider("");
            }
            throw err;
          }
        } else {
          // Normal email/password login
          if (!email.trim()) {
            setError("Please enter an email address");
            return;
          }

          if (!password.trim()) {
            setError("Please enter a password");
            return;
          }

          const trimmedEmail = email.trim();
          if (!validateEmail(trimmedEmail)) {
            setError("Please enter a valid email address");
            return;
          }

          await signInWithEmailAndPassword(auth, trimmedEmail, password);
        }

        // Add additional user info if provided
        await addUserInfo();
        history.push("/home");
      } catch (err: any) {
        // Explicit error handling
        switch (err.code) {
          case "auth/popup-closed-by-user":
            setError("Sign-in popup was closed. Please try again.");
            break;
          case "auth/cancelled-popup-request":
            setError("Sign-in attempt was cancelled. Please try again.");
            break;
          default:
            setError(err.code || "An error occurred during authentication");
        }
      } finally {
        // Always reset shouldLogin to allow future login attempts
        setShouldLogin(false);
      }
    };

    performLogin();
  }, [shouldLogin, provider, email, password]);

  const handleLogin = () => {
    // Reset any previous errors
    setError(null);
    setShouldLogin(true);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    provider,
    setProvider,
    error,
    setError,
    handleLogin,
  };
};

export const useLoggedIn = (): { isLoggedIn: boolean; isLoading: boolean } => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setIsLoggedIn(!!user);
        setIsLoading(false);
      },
      (error) => {
        console.error("Authentication check failed", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { isLoggedIn, isLoading };
};
