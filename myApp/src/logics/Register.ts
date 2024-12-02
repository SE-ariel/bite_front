import { useAuth } from "./Auth";
import { useState } from "react";

export const useRegister = () => {
  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");
  const [role, setRole] = useState("");
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );

  const auth = useAuth({
    additionalUserInfo: {
      firstName: firstName.trim(),
      surName: surName.trim(),
      role,
    },
  });

  const handleRegister = () => {
    // Validate first name and surname
    if (!firstName.trim()) {
      setRegistrationError("First name is required");
      return;
    }

    if (!surName.trim()) {
      setRegistrationError("Surname is required");
      return;
    }

    // Clear any previous errors
    setRegistrationError(null);

    // Proceed with login
    auth.handleLogin();
  };

  return {
    ...auth,
    firstName,
    setFirstName,
    surName,
    setSurName,
    role,
    setRole,
    error: registrationError || auth.error,
    handleRegister,
  };
};
