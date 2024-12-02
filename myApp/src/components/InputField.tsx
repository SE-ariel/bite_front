import React from "react";
import { IonInput, IonItem } from "@ionic/react";

interface InputFieldProps {
  label: string;
  type?: "text" | "email" | "password" | "number"; // Adjust types as needed
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text", // Default to "text"
  placeholder,
  value,
  onChange,
}) => {
  return (
    <IonItem>
      <IonInput
        label={label}
        type={type} // Pass the properly typed `type` prop here
        placeholder={placeholder}
        labelPlacement="floating"
        value={value}
        onIonChange={(e) => onChange(e.detail.value!)}
      ></IonInput>
    </IonItem>
  );
};

export default InputField;
