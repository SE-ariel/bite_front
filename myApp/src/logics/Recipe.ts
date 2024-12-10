import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  getAdditionalUserInfo,
  getAuth,
  onAuthStateChanged,
  User,
} from "firebase/auth";

export const useRoleStatus = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);

          // Add a real-time listener instead of just a single getDoc
          const unsubscribeDoc = onSnapshot(
            docRef,
            (docSnap) => {
              if (docSnap.exists()) {
                const currentRole = docSnap.get("Role");
                console.log("User Role is:", currentRole);
                setRole(currentRole);
              } else {
                console.log("No user document found");
                setRole("");
              }
            },
            (error) => {
              console.error("Error listening to user document:", error);
            }
          );

          // Return the unsubscribe function for the document listener
          return () => unsubscribeDoc();
        } catch (error) {
          console.error("Error checking role status:", error);
          setRole("");
        }
      } else {
        console.log("No user logged in");
        setRole("");
      }
    });

    // Cleanup both subscriptions on unmount
    return () => unsubscribe();
  }, []);

  return role;
};

// Optional: Function to create an admin document if needed
export const makeRecipe = async (role: string, userKey: string) => {
  try {
    const userinfo = doc(db, "users", userKey);
    await setDoc(userinfo, { Role: role }, { merge: true });
    console.log(`Role updated to ${role}`);
  } catch (error) {
    console.error("Error creating/updating admin document: ", error);
  }
};
