import React, { useState } from "react";
import { IonContent, IonPage, IonButton, IonCard, IonCardContent, IonToast } from "@ionic/react";
import PostTitleField from "../components/PostTitle";
import RecipeIngredientsField from "../components/PostIngredients";
import RecipeInstructionsField from "../components/PostInstructions";
import { handlePostUpload } from "../logics/Recipe";
import UploadImage from "../components/UploadImage";

const CreatePost: React.FC = () => {
    const [title, setTitle] = useState<string>("");
    const [ingredients, setIngredients] = useState<string>("");
    const [instructions, setInstructions] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [imageId, setImageId] = useState<string>("");

    const isFormValid = title.trim() !== "" && ingredients.trim() !== "" && instructions.trim() !== "";

    return (
            <IonContent fullscreen>
                <IonCard>
                    <IonCardContent>
                        <UploadImage onUpload={setImageId} />
                        <PostTitleField title={title} setTitle={setTitle} />
                        <RecipeIngredientsField ingredients={ingredients} setIngredients={setIngredients} />
                        <RecipeInstructionsField instructions={instructions} setInstructions={setInstructions} />
                        <IonButton
                            expand="block"
                            onClick={() => handlePostUpload(title, ingredients, instructions, imageId, setError)}
                            color="primary"
                            disabled={!isFormValid}
                        >
                            Upload Recipe
                        </IonButton>
                    </IonCardContent>
                </IonCard>
                {/* Toast for error */}
                <IonToast
                    isOpen={!!error}
                    message={error || ""}
                    duration={3000}
                    color="danger"
                    onDidDismiss={() => setError(null)}
                />
            </IonContent>
    );
};

export default CreatePost;
