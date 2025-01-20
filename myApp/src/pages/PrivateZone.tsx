import { IonButton, IonCard, IonCardContent, IonContent } from "@ionic/react";
import { Link } from "react-router-dom";
import { useRoleStatus } from "../logics/Role";
import { auth } from "../firebaseConfig";

const PrivateZone: React.FC = () => {
  const role = useRoleStatus(); // קבלת תפקיד המשתמש דרך ה-Hook
  const userId = auth.currentUser?.uid; // קבלת ה-UID של המשתמש הנוכחי

  return (
    <IonContent>
      <IonCard>
        <IonCardContent>
          <IonButton href="settings">Settings</IonButton>
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardContent>
          {/* אם יש משתמש מחובר, הוסף את ה-ID שלו ל-URL */}
          {userId && (
            // השתמש ב-<Link> ישירות על IonButton
            <Link to={`/saved_recipes/${userId}`}>
              <IonButton>Saved Recipes</IonButton>
            </Link>
          )}
        </IonCardContent>
      </IonCard>
      <IonCard>
        <IonCardContent>
          {/* אם יש משתמש מחובר, הוסף את ה-ID שלו ל-URL */}
          {userId && (role == "Admin" || role == "ContentCreator") && (
            // השתמש ב-<Link> ישירות על IonButton
            <Link to={`/created_recipes/${userId}`}>
              <IonButton>Created Recipes</IonButton>
            </Link>
          )}
        </IonCardContent>
      </IonCard>
    </IonContent>
  );
};

export default PrivateZone;
