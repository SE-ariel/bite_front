import React, { useState, useEffect } from "react";
import {
    IonContent,
    IonButton,
    IonCard,
    IonCardContent,
    IonToast,
    IonSpinner,
} from "@ionic/react";
import PostTitleField from "../components/PostTitle";
import RecipeIngredientsField from "../components/PostIngredients";
import RecipeInstructionsField from "../components/PostInstructions";
import { handlePostUpload } from "../logics/Recipe";
import UploadImage from "../components/UploadImage";
import { useRecipe } from "../logics/Recipe";
import { useParams } from "react-router-dom"; // To fetch recipe ID from route params

const EditPost: React.FC = () => {
    const { id: postId } = useParams<{ id: string }>(); // Fetch postId from the route parameter
    const { recipe, error } = useRecipe(postId); // Use the existing hook to load recipe
    const [title, setTitle] = useState<string>("");
    const [ingredients, setIngredients] = useState<string>("");
    const [instructions, setInstructions] = useState<string>("");
    const [imageId, setImageId] = useState<string>("");
    const [saveError, setSaveError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Populate form with recipe data
    useEffect(() => {
        if (recipe) {
            setTitle(recipe.title || "");
            setIngredients((recipe.ingredients || []).join("\n"));
            setInstructions((recipe.instructions || []).join("\n"));
            setImageId(recipe.imageId || "");
        }
    }, [recipe]);

    const isFormValid =
        title.trim() !== "" &&
        ingredients.trim() !== "" &&
        instructions.trim() !== "";

    if (!recipe && !error) {
        return <IonSpinner />; // Show a loading spinner while fetching
    }

    return (
        <IonContent fullscreen>
            <IonCard>
                <IonCardContent>
                    <UploadImage onUpload={setImageId} />
                    <PostTitleField title={title} setTitle={setTitle} />
                    <RecipeIngredientsField
                        ingredients={ingredients}
                        setIngredients={setIngredients}
                    />
                    <RecipeInstructionsField
                        instructions={instructions}
                        setInstructions={setInstructions}
                    />
                    <IonButton
                        expand="block"
                        onClick={() =>
                            handlePostUpload(
                                title,
                                ingredients,
                                instructions,
                                imageId,
                                setSaveError,
                                postId // Update the specific recipe
                            )
                        }
                        color="primary"
                        disabled={!isFormValid}
                    >
                        Update Recipe
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
                isOpen={!!saveError || !!error}
                message={saveError || error || ""}
                duration={3000}
                color="danger"
                onDidDismiss={() => setSaveError(null)}
            />
        </IonContent>
    );
};

export default EditPost;



