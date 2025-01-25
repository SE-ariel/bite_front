import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";

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
