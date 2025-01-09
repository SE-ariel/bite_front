import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { format } from "date-fns";

export interface Notification {
  id: string;
  body: string;
  createdAt: Timestamp;
  read: boolean;
  recipeId: string;
  title: string;
  type: string;
  userId: string;
}

export const getRecentNotifications = async (): Promise<Notification[]> => {
  try {
    const userId = auth.currentUser?.uid;
    // Calculate date from one week ago
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Create query
    const notificationsRef = collection(db, "notifications");
    const q = query(
      notificationsRef,
      where("userId", "==", userId),
      where("createdAt", ">=", Timestamp.fromDate(oneWeekAgo)),
      orderBy("createdAt", "desc")
    );

    // Execute query
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docChanges());
    // Transform data
    const notifications: Notification[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Notification, "id">),
    }));

    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

export const fetchNotifications = async (
  setNotifications: (notifications: Notification[]) => void,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
) => {
  try {
    setLoading(true);
    setError(null);
    const data = await getRecentNotifications();
    setNotifications(data);
  } catch (err) {
    setError("Failed to load notifications");
    console.error("Error:", err);
  } finally {
    setLoading(false);
  }
};

export const handleRefresh = async (
  event: CustomEvent,
  setNotifications: (notifications: Notification[]) => void,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
) => {
  await fetchNotifications(setNotifications, setLoading, setError);
  event.detail.complete();
};

export const formatDate = (timestamp: any) => {
  const date = timestamp.toDate();
  return format(date, "MMM d, yyyy h:mm a");
};
