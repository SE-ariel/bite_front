import { useState } from "react";
import { IonContent, IonPage, IonButton, IonInput, IonLabel, IonItem, IonAlert } from "@ionic/react";
import { db } from "../firebaseConfig";  
import { collection, query, where, getDocs } from "firebase/firestore";
import GetUserRecipesList from "../components/UserRecipesList"; 

const UserPage: React.FC = () => {
  const [userName, setUserName] = useState<string>(""); 
  const [userRecipes, setUserRecipes] = useState<any[]>([]); 
  const [error, setError] = useState<string | null>(null);

 //function to find recipes by user name
  const handleSearch = async () => {
    if (!userName) {
      setError("Please enter a username.");
      return;
    }

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("FirstName", "==", userName));  
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("No users found with that username.");
        setUserRecipes([]);
        return;
      }

      const userRecipesData: any[] = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.recipes) {
          userData.recipes.forEach((recipeId: string) => {
            userRecipesData.push({ recipeId });
          });
        }
      });

      if (userRecipesData.length === 0) {
        setError("No recipes found for this user.");
      } else {
        setUserRecipes(userRecipesData);
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Error fetching user data.");
      setUserRecipes([]);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <h1>User Page</h1>

        {/* Input field for the username */}
        <IonItem>
          <IonLabel position="stacked">Username</IonLabel>
          <IonInput
            value={userName}
            onIonChange={(e) => setUserName(e.detail.value!)}
            placeholder="Enter username"
          />
        </IonItem>

        {/* Button to trigger the search */}
        <IonButton expand="block" onClick={handleSearch}>
          Search
        </IonButton>

        {/* Show error message if no username is provided */}
        {error && <IonAlert isOpen={true} message={error} buttons={["OK"]} />}

        {/* Show User's Recipes List if a valid username is provided */}
        {userRecipes.length > 0 && !error && (
          <div>
            <h2> {userName}'s page</h2>
            <GetUserRecipesList recipes={userRecipes} />
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default UserPage;
