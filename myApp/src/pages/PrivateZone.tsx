import { IonButton, IonCard, IonCardContent, IonContent } from "@ionic/react";
import "./Home.css";
import { useRoleStatus } from "../logics/Role";

const PrivateZone: React.FC = () => {

  const role = useRoleStatus(); // קבלת תפקיד המשתמש דרך ה-Hook
  return (
    <IonContent>
      <IonCard>
        <IonCardContent>
          <IonButton href="settings">settings</IonButton>
        </IonCardContent>
      </IonCard>
      <IonCard>
        <IonCardContent>
          <IonButton href="saved_recipes">saved recipes</IonButton>
        </IonCardContent>
      </IonCard>
      {role === "Admin" && ( //להוסיף גם יוצר תוכן אבל לא ידעתי איך קוראים לו
        <IonCard>
          <IonCardContent>
            <IonButton href="createRecipe">Create Recipe</IonButton>
          </IonCardContent>
        </IonCard>
      )}
    </IonContent>
  );
};

export default PrivateZone;
