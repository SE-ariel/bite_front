import { useState } from "react";
import { auth } from "../firebaseConfig";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

export const useUpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleUpdatePassword = async () => {
    if (!auth.currentUser) return;

    try {
      // Reauthenticate the user
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email!,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Update password
      await updatePassword(auth.currentUser, password);

      setSuccess(true);
      setError(null);
      console.log(`Password updated successfully`);
    } catch (error: any) {
      setError(error.message);
      setSuccess(false);
      console.error("Error updating password", error);
    }
  };

  return {
    password,
    setPassword,
    currentPassword,
    setCurrentPassword,
    handleUpdatePassword,
    error,
    success,
  };
};
