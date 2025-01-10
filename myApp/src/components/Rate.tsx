import React from "react";
import {
  IonIcon,
  IonButton,
  IonCard,
  IonCardContent,
  IonTitle,
  IonText,
} from "@ionic/react";
import { star, starOutline } from "ionicons/icons";
import { useRating } from "../logics/Rate";

interface Props {
  recipeId: string;
}

const Rate: React.FC<Props> = ({ recipeId }) => {
  const {
    currentRating,
    rateAmount,
    loading,
    error,
    selectedRating,
    isSubmitted,
    handleStarClick,
    handleSubmit,
  } = useRating(recipeId);

  if (loading) return;
  if (error) return <IonText>Error: {error}</IonText>;

  return (
    <IonCard>
      <IonCardContent className="ion-text-center">
        <IonTitle size="large">Rate this recipe</IonTitle>
        {[1, 2, 3, 4, 5].map((starNumber) => (
          <IonIcon
            key={starNumber}
            size="large"
            icon={
              starNumber <= (isSubmitted ? currentRating : selectedRating)
                ? star
                : starOutline
            }
            onClick={() => handleStarClick(starNumber)}
            style={{ color: "#ffc409" }}
          />
        ))}
        {!isSubmitted && (
          <IonButton
            expand="block"
            onClick={handleSubmit}
            disabled={selectedRating === 0}
          >
            Submit Rating
          </IonButton>
        )}

        {isSubmitted && (
          <IonTitle>
            Average Rating: {currentRating.toFixed(1)} ({rateAmount} ratings)
          </IonTitle>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default Rate;
