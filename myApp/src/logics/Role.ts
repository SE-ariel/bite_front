import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc, onSnapshot, collection, getDocs, query, where } from "firebase/firestore";
import { getAdditionalUserInfo, getAuth, onAuthStateChanged, User } from "firebase/auth";

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


const getUserUidByEmail = async (email: string) => {
  try {
    const auth = getAuth();
    const usersRef = collection(db, 'users'); // Assuming you store users in a 'users' collection
    const q = query(usersRef, where('email', '==', email));
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Return the first matching user's UID
      return querySnapshot.docs[0].id;
    }
    
    return null; // No user found with this email
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
};

export default getUserUidByEmail;

// Optional: Function to create an admin document if needed
export const makeUserRole = async (role: string, userKey: string) => {
  try {
    const userinfo = doc(db, "users", getUserUidByEmail(userKey));
    await setDoc(userinfo, { Role: role }, { merge: true });
    console.log(`Role updated to ${role}`);
  } catch (error) {
    console.error("Error creating/updating admin document: ", error);
  }
};
