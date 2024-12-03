import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
} from "@ionic/react";
import { makeUserRole } from "../logics/Role";
import { useState } from "react";

const MakeAdmin: React.FC = () => {
  const [id, setId] = useState("");
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle> make user an admin using its id</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonInput
          onIonInput={(e) => setId(e.detail.value || "")}
          placeholder="id"
        />
        <IonButton
          onClick={() => {
            makeUserRole("Admin", id);
          }}
        >
          make user an admin
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default MakeAdmin;
