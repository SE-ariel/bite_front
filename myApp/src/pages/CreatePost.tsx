// import React, { useState } from "react";
// import { IonContent, IonPage, IonButton, IonCard, IonCardContent, IonToast } from "@ionic/react";
// import PostTitleField from "../components/PostTitleField";
// import RecipeIngredientsField from "../components/PostIngredients";
// import RecipeInstructionsField from "../components/PostInstructions";
// import UploadPhotoButton from "../components/UploadPhotoButton";
// import Header from "../components/Header"; // Import Header component
// import { makeRecipe } from "../logics/Recipe";
// import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

// const storage = getStorage();

// const CreatePost: React.FC = () => {
//     const [title, setTitle] = useState<string>("");
//     const [ingredients, setIngredients] = useState<string>("");
//     const [instructions, setInstructions] = useState<string>("");
//     const [photo, setPhoto] = useState<File | null>(null);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);

//     // Upload photo to Firebase Storage
//     const uploadPhoto = async (file: File): Promise<string | null> => {
//         try {
//             const storageRef = ref(storage, `recipes/${file.name}`);
//             const snapshot = await uploadBytes(storageRef, file);
//             const downloadURL = await getDownloadURL(snapshot.ref);
//             return downloadURL;
//         } catch (error) {
//             console.error("Error uploading photo:", error);
//             return null;
//         }
//     };

//     // Handle the form submission
//     const handlePostUpload = async () => {
//         if (!title || !ingredients || !instructions) {
//             setError("Title, ingredients, and instructions are required!");
//             return;
//         }

//         try {
//             const photoUrl = photo ? await uploadPhoto(photo) : null;

//             const recipeData = {
//                 title,
//                 ingredients: ingredients.split("\n"),
//                 instructions: instructions.split("\n"),
//                 photoUrl,
//             };

//             const recipeId = await makeRecipe(recipeData);
//             setSuccessMessage(`Recipe "${title}" created successfully!`);
//             setTitle("");
//             setIngredients("");
//             setInstructions("");
//             setPhoto(null);
//         } catch (error) {
//             console.error("Error uploading post:", error);
//             setError("Failed to upload post. Please try again.");
//         }
//     };

//     const isFormValid = title.trim() !== "" && ingredients.trim() !== "" && instructions.trim() !== "";

//     return (
//         <IonPage>
//             <Header title="Create Recipe" /> {/* Integrated Header Component */}
//             <IonContent fullscreen>
//                 <IonCard>
//                     <IonCardContent>
//                         <UploadPhotoButton onPhotoUpload={setPhoto} />
//                         <PostTitleField title={title} setTitle={setTitle} />
//                         <RecipeIngredientsField ingredients={ingredients} setIngredients={setIngredients} />
//                         <RecipeInstructionsField instructions={instructions} setInstructions={setInstructions} />
//                         <IonButton
//                             expand="block"
//                             onClick={handlePostUpload}
//                             color="primary"
//                             disabled={!isFormValid}
//                         >
//                             Upload Recipe
//                         </IonButton>
//                     </IonCardContent>
//                 </IonCard>
//                 {/* Toast for success */}
//                 <IonToast
//                     isOpen={!!successMessage}
//                     message={successMessage || ""}
//                     duration={3000}
//                     color="success"
//                     onDidDismiss={() => setSuccessMessage(null)}
//                 />
//                 {/* Toast for error */}
//                 <IonToast
//                     isOpen={!!error}
//                     message={error || ""}
//                     duration={3000}
//                     color="danger"
//                     onDidDismiss={() => setError(null)}
//                 />
//             </IonContent>
//         </IonPage>
//     );
// };

// export default CreatePost;

import React, { useState } from "react";
import { IonContent, IonPage, IonButton, IonCard, IonCardContent, IonToast } from "@ionic/react";
import PostTitleField from "../components/PostTitleField";
import RecipeIngredientsField from "../components/PostIngredients";
import RecipeInstructionsField from "../components/PostInstructions";
import UploadPhotoButton from "../components/UploadPhotoButton";
import Header from "../components/Header";
import { makeRecipe } from "../logics/Recipe";

const CreatePost: React.FC = () => {
    const [title, setTitle] = useState<string>("");
    const [ingredients, setIngredients] = useState<string>("");
    const [instructions, setInstructions] = useState<string>("");
    const [photoBase64, setPhotoBase64] = useState<string | null>(null); // Store photo as base64 string
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Function to compress and convert the photo to a base64 string
    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    // Handle the form submission
    const handlePostUpload = async () => {
        if (!title || !ingredients || !instructions) {
            setError("Title, ingredients, and instructions are required!");
            return;
        }

        try {
            const recipeData = {
                title,
                ingredients: ingredients.split("\n"),
                instructions: instructions.split("\n"),
                photoBase64, // Include the photo as a base64 string
            };

            const recipeId = await makeRecipe(recipeData);
            setSuccessMessage(`Recipe "${title}" created successfully!`);
            setTitle("");
            setIngredients("");
            setInstructions("");
            setPhotoBase64(null);
        } catch (error) {
            console.error("Error uploading post:", error);
            setError("Failed to upload post. Please try again.");
        }
    };

    const isFormValid = title.trim() !== "" && ingredients.trim() !== "" && instructions.trim() !== "";

    return (
        <IonPage>
            <Header title="Create Recipe" />
            <IonContent fullscreen>
                <IonCard>
                    <IonCardContent>
                        <UploadPhotoButton
                            onPhotoUpload={async (file) => {
                                try {
                                    const base64 = await convertToBase64(file);
                                    setPhotoBase64(base64);
                                } catch (error) {
                                    console.error("Error converting photo:", error);
                                    setError("Failed to process photo. Please try again.");
                                }
                            }}
                        />
                        <PostTitleField title={title} setTitle={setTitle} />
                        <RecipeIngredientsField ingredients={ingredients} setIngredients={setIngredients} />
                        <RecipeInstructionsField instructions={instructions} setInstructions={setInstructions} />
                        <IonButton
                            expand="block"
                            onClick={handlePostUpload}
                            color="primary"
                            disabled={!isFormValid}
                        >
                            Upload Recipe
                        </IonButton>
                    </IonCardContent>
                </IonCard>
                {/* Toast for success */}
                <IonToast
                    isOpen={!!successMessage}
                    message={successMessage || ""}
                    duration={3000}
                    color="success"
                    onDidDismiss={() => setSuccessMessage(null)}
                />
                {/* Toast for error */}
                <IonToast
                    isOpen={!!error}
                    message={error || ""}
                    duration={3000}
                    color="danger"
                    onDidDismiss={() => setError(null)}
                />
            </IonContent>
        </IonPage>
    );
};

export default CreatePost;











