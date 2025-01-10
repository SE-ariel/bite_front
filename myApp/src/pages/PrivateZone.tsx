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

      {role === "Admin" && (
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
