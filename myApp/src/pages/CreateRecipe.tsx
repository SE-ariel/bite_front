// import { IonContent, IonPage, IonButton, IonInput, IonLabel, IonItem, IonTextarea, IonAlert, IonList, IonText } from "@ionic/react";
// import "./Home.css";
// import Header from "../components/Header";
// import { makeRecipe, useRecipe } from "../logics/Recipe";
// import { useState, useEffect } from "react";
// import { db } from "../firebaseConfig";
// import { collection, query, where, getDocs } from "firebase/firestore";

// const Home: React.FC = () => {
//   const [title, setTitle] = useState<string>("");
//   const [ingredients, setIngredients] = useState<string>("");
//   const [instructions, setInstructions] = useState<string>("");
//   const [recipeData, setRecipeData] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [fetchedRecipeId, setFetchedRecipeId] = useState<string>("");
//   const [userName, setUserName] = useState<string>(""); // State to hold the username input
//   const [userRecipes, setUserRecipes] = useState<any[]>([]); // State to hold user's recipes

//   // Function to upload a new recipe
//   const uploadRecipe = async () => {
//     if (!title || !ingredients || !instructions) {
//       setError("All fields are required!");
//       return;
//     }

//     const recipeData = {
//       title,
//       instructions: instructions.split("\n"), // Split by lines for instructions
//       ingredients: ingredients.split("\n"), // Split by lines for ingredients
//     };

//     try {
//       const recipeId = await makeRecipe(recipeData); // Automatically associates the recipe with the logged-in user
//       alert(`Recipe "${title}" created successfully! Recipe ID: ${recipeId}`);
//       setRecipeData(recipeData);
//       setFetchedRecipeId(recipeId); // Save the ID for later fetching if needed
//       setError(null); // Clear any errors
//     } catch (error) {
//       console.error("Error creating recipe:", error);
//       setError("Failed to create recipe. Check the console for details.");
//     }
//   };

//   // Function to fetch a recipe using useRecipe
//   const fetchRecipe = async () => {
//     if (!fetchedRecipeId) {
//       setError("Please enter a recipe ID.");
//       return;
//     }

//     try {
//       const result = await useRecipe(fetchedRecipeId); // Use the hook to fetch the recipe
//       if (result.error) {
//         setError(result.error);
//         setRecipeData(null);
//       } else {
//         setRecipeData(result.recipe);
//         setError(null);
//       }
//     } catch (err) {
//       console.error("Error fetching recipe:", err);
//       setError("Error fetching recipe");
//       setRecipeData(null);
//     }
//   };

//   // Function to fetch recipes by FirstName
//   const fetchUserRecipes = async () => {
//     if (!userName) {
//       setError("Please enter a username.");
//       return;
//     }

//     try {
//       const usersRef = collection(db, "users");
//       const q = query(usersRef, where("FirstName", "==", userName));  // Search by FirstName
//       const querySnapshot = await getDocs(q);

//       if (querySnapshot.empty) {
//         setError("No users found with that username.");
//         setUserRecipes([]);
//         return;
//       }

//       const userRecipesData: any[] = [];
//       querySnapshot.forEach((doc) => {
//         const userData = doc.data();
//         if (userData.recipes) {
//           userData.recipes.forEach((recipeId: string) => {
//             userRecipesData.push({ recipeId });
//           });
//         }
//       });

//       if (userRecipesData.length === 0) {
//         setError("No recipes found for this user.");
//       } else {
//         setUserRecipes(userRecipesData);
//       }
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching user recipes:", err);
//       setError("Error fetching user recipes.");
//       setUserRecipes([]);
//     }
//   };

//   useEffect(() => {
//     if (userName) {
//       fetchUserRecipes();
//     }
//   }, [userName]); // Fetch recipes whenever the username changes

//   return (
//     <IonPage>
//       <Header title="Home" />
//       <IonContent fullscreen className="ion-padding">
//         <h1>Welcome to the Recipe App</h1>

//         {/* Button to upload a recipe */}
//         <IonButton expand="block" onClick={uploadRecipe}>
//           Upload Recipe
//         </IonButton>

//         <h2>Search for a Recipe</h2>

//         {/* Input fields for recipe details */}
//         <IonItem>
//           <IonLabel position="stacked">Recipe Title</IonLabel>
//           <IonInput
//             value={title}
//             onIonChange={(e) => setTitle(e.detail.value!)}
//             placeholder="Enter Recipe Title"
//           />
//         </IonItem>

//         <IonItem>
//           <IonLabel position="stacked">Ingredients</IonLabel>
//           <IonTextarea
//             value={ingredients}
//             onIonChange={(e) => setIngredients(e.detail.value!)}
//             placeholder="Enter Ingredients, one per line"
//           />
//         </IonItem>

//         <IonItem>
//           <IonLabel position="stacked">Instructions</IonLabel>
//           <IonTextarea
//             value={instructions}
//             onIonChange={(e) => setInstructions(e.detail.value!)}
//             placeholder="Enter Instructions, one per line"
//           />
//         </IonItem>

//         {/* Button to fetch a recipe */}
//         <IonButton expand="block" onClick={fetchRecipe}>
//           Fetch Recipe
//         </IonButton>

//         {/* Display recipe if found */}
//         {recipeData && (
//           <div>
//             <h3>{recipeData.title}</h3>
//             <p>
//               <strong>Creator:</strong> {recipeData.creator}
//             </p>
//             <p>
//               <strong>Ingredients:</strong> {recipeData.ingredients.join(", ")}
//             </p>
//             <p>
//               <strong>Instructions:</strong> {recipeData.instructions.join(", ")}
//             </p>
//           </div>
//         )}

//         {/* Input for Username */}
//         <IonItem>
//           <IonLabel position="stacked">Username</IonLabel>
//           <IonInput
//             value={userName}
//             onIonChange={(e) => setUserName(e.detail.value!)}
//             placeholder="Enter Username"
//           />
//         </IonItem>

//         {/* Button to show user's recipes */}
//         <IonButton expand="block" onClick={fetchUserRecipes}>
//           Show {userName}'s Recipes
//         </IonButton>

//         {/* Display user's recipes */}
//         {userRecipes.length > 0 && (
//           <IonList>
//             {userRecipes.map((userRecipe, index) => (
//               <IonItem key={index}>
//                 <IonLabel>
//                   <h2>Recipe ID: {userRecipe.recipeId}</h2>
//                 </IonLabel>
//               </IonItem>
//             ))}
//           </IonList>
//         )}

//         {/* Display error if recipe not found */}
//         {error && <IonAlert isOpen={true} message={error} buttons={["OK"]} />}
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Home;

import React, { useState } from "react";
import {
    IonContent,
    IonPage,
    IonButton,
    IonInput,
    IonLabel,
    IonItem,
    IonTextarea,
    IonToast,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
} from "@ionic/react";
import { makeRecipe } from "../logics/Recipe";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import "./CreateRecipe.css";

const storage = getStorage();

const CreateRecipe: React.FC = () => {
    const [title, setTitle] = useState<string>("");
    const [ingredients, setIngredients] = useState<string>("");
    const [instructions, setInstructions] = useState<string>("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const uploadPhoto = async (file: File): Promise<string | null> => {
        try {
            const storageRef = ref(storage, `recipes/${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            return downloadURL;
        } catch (error) {
            setError("Failed to upload photo.");
            return null;
        }
    };

    const uploadRecipe = async () => {
        if (!title || !ingredients || !instructions) {
            setError("All fields except photo are required!");
            return;
        }

        try {
            const photoUrl = photo ? await uploadPhoto(photo) : null;
            const recipeData = {
                title,
                ingredients: ingredients.split("\n"),
                instructions: instructions.split("\n"),
                photoUrl,
                createdAt: new Date(),
            };

            const recipeId = await makeRecipe(recipeData);
            setSuccessMessage(`Recipe "${title}" created successfully!`);
            setTitle("");
            setIngredients("");
            setInstructions("");
            setPhoto(null);
        } catch (error) {
            setError("Failed to upload recipe. Please try again.");
        }
    };

    return (
        <IonPage>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/home" />
                </IonButtons>
                <IonTitle>Create Recipe</IonTitle>
            </IonToolbar>

            <IonContent fullscreen>
                <IonCard className="create-recipe-container">
                    <IonCardHeader>
                        <IonCardTitle className="center-text">Create a New Recipe</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        {/* Recipe Title */}
                        <IonItem lines="full">
                            <IonLabel position="stacked" color="primary">
                                Recipe Title
                            </IonLabel>
                            <IonInput
                                value={title}
                                onIonChange={(e) => setTitle(e.detail.value!)}
                                placeholder="Enter Recipe Title"
                                className="input-field"
                            />
                        </IonItem>

                        {/* Ingredients */}
                        <IonItem lines="full">
                            <IonLabel position="stacked" color="primary">
                                Ingredients
                            </IonLabel>
                            <IonTextarea
                                value={ingredients}
                                onIonChange={(e) => setIngredients(e.detail.value!)}
                                placeholder="Enter Ingredients, one per line"
                                className="textarea-field"
                            />
                        </IonItem>

                        {/* Instructions */}
                        <IonItem lines="full">
                            <IonLabel position="stacked" color="primary">
                                Instructions
                            </IonLabel>
                            <IonTextarea
                                value={instructions}
                                onIonChange={(e) => setInstructions(e.detail.value!)}
                                placeholder="Enter Instructions, one per line"
                                className="textarea-field"
                            />
                        </IonItem>

                        {/* Photo Upload */}
                        <IonItem lines="none">
                            <IonLabel position="stacked" color="primary">
                                Upload Photo
                            </IonLabel>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
                                style={{ marginTop: "10px" }}
                            />
                        </IonItem>

                        {/* Upload Button */}
                        <IonButton
                            expand="block"
                            onClick={uploadRecipe}
                            color="primary"
                            className="upload-button"
                        >
                            Upload Recipe
                        </IonButton>
                    </IonCardContent>
                </IonCard>

                {/* Success Toast */}
                <IonToast
                    isOpen={!!successMessage}
                    message={successMessage || undefined}
                    duration={3000}
                    onDidDismiss={() => setSuccessMessage(null)}
                    color="success"
                />

                {/* Error Toast */}
                <IonToast
                    isOpen={!!error}
                    message={error || undefined}
                    duration={3000}
                    onDidDismiss={() => setError(null)}
                    color="danger"
                />
            </IonContent>
        </IonPage>
    );
};

export default CreateRecipe;





