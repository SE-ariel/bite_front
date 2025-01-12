import { useState, useEffect } from "react";
import { doc, updateDoc, getDoc, FirestoreError } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface RecipeData {
  currentRate?: number;
  rateAmount?: number;
}

export const useRating = (recipeId: string) => {
  const [currentRating, setCurrentRating] = useState(0);
  const [rateAmount, setRateAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const docRef = doc(db, "recipes", recipeId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as RecipeData;
          setCurrentRating(data?.currentRate ?? 0);
          setRateAmount(data?.rateAmount ?? 0);
        }
      } catch (err) {
        const error = err as FirestoreError;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRating();
  }, [recipeId]);

  const handleStarClick = (rating: number) => {
    if (!isSubmitted) {
      setSelectedRating(rating);
    }
  };

  const handleSubmit = async () => {
    if (selectedRating > 0) {
      try {
        const docRef = doc(db, "recipes", recipeId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as RecipeData;
          const newAmount = (data?.rateAmount ?? 0) + 1;
          const newAverage =
            ((data?.currentRate ?? 0) * (data?.rateAmount ?? 0) +
              selectedRating) /
            newAmount;

          await updateDoc(docRef, {
            currentRate: newAverage,
            rateAmount: newAmount,
          });

          setCurrentRating(newAverage);
          setRateAmount(newAmount);
          setIsSubmitted(true);
          return true;
        }
        return false;
      } catch (err) {
        const error = err as FirestoreError;
        setError(error.message);
        return false;
      }
    }
    return false;
  };

  return {
    currentRating,
    rateAmount,
    loading,
    error,
    selectedRating,
    isSubmitted,
    handleStarClick,
    handleSubmit,
  };
};
