import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import {
  doc,
  getDoc,
  DocumentData,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export const getUserIdByEmail = async (
    email: string
  ): Promise<string | null> => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email.trim().toLowerCase()));
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const user = querySnapshot.docs[0];
        return user.id;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

export const data = async (uid: string) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No user document found");
      return null;
    }
  } catch (error) {
    console.error("Error checking role status:", error);
    return null;
  }
};

export interface UserData {
  firstName: string; // Corrected casing to camelCase
  lastName: string; // Replaced SurName with standard lastName
  role: string;
  email: string;
  savedRecipes: string;
}

export const useProfile = (id: string) => {
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    savedRecipes: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result: DocumentData | null = await data(id || "");
        if (result) {
          // Type assertion or mapping
          setUserData({
            firstName: result.firstName || "",
            lastName: result.surName || "",
            role: result.role || "",
            email: result.email || "",
            savedRecipes: result.savedRecipes || "",
          });
        }
        setIsChecked(true);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, [id]);

  return { userData, isChecked };
};
