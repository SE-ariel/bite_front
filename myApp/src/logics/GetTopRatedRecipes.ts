import {
  collection,
  query,
  orderBy,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { format } from "date-fns";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  createdAt: Timestamp;
  currentRate: number;
  rateAmount: number;
}

export const getTopRatedRecipes = async (): Promise<Recipe[]> => {
  try {
    // Create query
    const recipesRef = collection(db, "recipes");
    const q = query(
      recipesRef,
      orderBy("currentRate", "desc"),
      orderBy("rateAmount", "desc"),
      orderBy("createdAt", "desc")
    );

    // Execute query
    const querySnapshot = await getDocs(q);

    // Transform data
    const recipes: Recipe[] = querySnapshot.docs.slice(0, 5).map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Recipe, "id">),
    }));

    return recipes;
  } catch (error) {
    console.error("Error fetching top rated recipes:", error);
    throw error;
  }
};

export const fetchTopRatedRecipes = async (
  setRecipes: (recipes: Recipe[]) => void,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
) => {
  try {
    setLoading(true);
    setError(null);
    const data = await getTopRatedRecipes();
    setRecipes(data);
  } catch (err) {
    setError("Failed to load top rated recipes");
    console.error("Error:", err);
  } finally {
    setLoading(false);
  }
};

export const handleRefresh = async (
  event: CustomEvent,
  setRecipes: (recipes: Recipe[]) => void,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
) => {
  await fetchTopRatedRecipes(setRecipes, setLoading, setError);
  event.detail.complete();
};

export const formatDate = (timestamp: any) => {
  const date = timestamp.toDate();
  return format(date, "MMM d, yyyy h:mm a");
};