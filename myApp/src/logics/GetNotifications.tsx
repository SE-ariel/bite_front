import { collection, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig'

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
    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      where('userId', '==', userId),
      where('createdAt', '>=', Timestamp.fromDate(oneWeekAgo)),
      orderBy('createdAt', 'desc')
    );

    // Execute query
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docChanges());
    // Transform data
    const notifications: Notification[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as Omit<Notification, 'id'>
    }));

    return notifications;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};