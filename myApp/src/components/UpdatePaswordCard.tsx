import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonText,
} from "@ionic/react";
import { useUpdatePassword } from "../logics/UpdatePassword";

const UpdatePasswordCard: React.FC = () => {
  const {
    setPassword,
    setCurrentPassword,
    handleUpdatePassword,
    error,
    success,
  } = useUpdatePassword();

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Change Your Password</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonInput
          type="password"
          onIonInput={(e) => setCurrentPassword(e.detail.value || "")}
          placeholder="Current password"
        />
        <IonInput
          type="password"
          onIonInput={(e) => setPassword(e.detail.value || "")}
          placeholder="New password"
        />
        <IonButton onClick={handleUpdatePassword}>Change Password</IonButton>
      </IonCardContent>
      <IonCardContent>
        {error && <IonText color="warning">{error}</IonText>}
        {success && <IonText color="success">Password changed!</IonText>}
      </IonCardContent>
    </IonCard>
  );
};

export default UpdatePasswordCard;
