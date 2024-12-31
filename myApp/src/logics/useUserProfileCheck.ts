import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const useUserProfileCheck = () => {
  const [isUserChecked, setIsUserChecked] = useState(false);
  const [needsSetup, setNeedsSetup] = useState(false);

  useEffect(() => {
    const checkUserProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists() || !userSnap.data().firstName) {
          setNeedsSetup(true);
        }
      }
      setIsUserChecked(true);
    };

    checkUserProfile();
  }, []);

  return { isUserChecked, needsSetup };
};

export default useUserProfileCheck;
