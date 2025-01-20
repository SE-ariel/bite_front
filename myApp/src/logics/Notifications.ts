import { PushNotifications } from "@capacitor/push-notifications";
import { LocalNotifications } from "@capacitor/local-notifications";
import {
  collection,
  doc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  getDoc,
  setDoc,
  Unsubscribe,
} from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { useEffect, useRef } from "react";
import { Capacitor } from "@capacitor/core";

export const useNotifications = () => {
  const unsubscribeRefs = useRef<Unsubscribe[]>([]);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      initializePushNotifications();
    }

    // Start listening for notifications
    const cleanup = setupNotificationListeners();

    // Cleanup function
    return () => {
      cleanup();
      // Unsubscribe from all listeners
      unsubscribeRefs.current.forEach(unsubscribe => unsubscribe());
    };
  }, []);

  const initializePushNotifications = async () => {
    await PushNotifications.requestPermissions();
    await PushNotifications.register();
  };

  const sendNotification = async (title: string, body: string) => {
    await LocalNotifications.createChannel({
      id: "default",
      name: "Default",
      description: "Default channel",
      importance: 5,
      visibility: 1,
    });

    await LocalNotifications.schedule({
      notifications: [
        {
          title,
          body,
          id: new Date().getTime() % 2147483647,
          schedule: { at: new Date(Date.now() + 1000) },
          sound: undefined,
          attachments: undefined,
          actionTypeId: "",
          extra: null,
        },
      ],
    });
  };

  const setupNotificationListeners = () => {
    if (!auth.currentUser) return () => {};

    const uid = auth.currentUser.uid;
    const userDoc = doc(db, "users", uid);

    // Listen for changes in user's following list
    const userUnsubscribe = onSnapshot(userDoc, async (docSnapshot) => {
      const userData = docSnapshot.data();
      if (!userData?.following) return;

      // Unsubscribe from previous recipe listeners
      unsubscribeRefs.current.forEach(unsubscribe => unsubscribe());
      unsubscribeRefs.current = [];

      // Set up new recipe listeners for each followed user
      userData.following.forEach((followedUserId: string) => {
        const recipesRef = collection(db, "recipes");
        const q = query(
          recipesRef,
          where("creatorId", "==", followedUserId),
          orderBy("createdAt", "desc"),
          limit(1)
        );

        const recipeUnsubscribe = onSnapshot(q, async (snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            if (change.type === "added") {
              const recipe = change.doc.data();
              const creatorDoc = await getDoc(doc(db, "users", recipe.creatorId));
              const creatorData = creatorDoc.data();
              
              if (creatorData) {
                const creatorName = `${creatorData.firstName} ${creatorData.surName}`;
                
                if (Capacitor.isNativePlatform()) {
                  sendNotification(
                    "New Recipe",
                    `${creatorName} posted: ${recipe.title}`
                  );
                }

                const documentId = uid + change.doc.id;
                const documentData = {
                  userId: uid,
                  title: "New Recipe",
                  body: `${creatorName} posted: ${recipe.title}`,
                  recipeId: change.doc.id,
                  read: false,
                  type: "new_recipe",
                  createdAt: recipe.createdAt,
                };

                const docRef = doc(db, "notifications", documentId);
                await setDoc(docRef, documentData);
              }
            }
          });
        });

        unsubscribeRefs.current.push(recipeUnsubscribe);
      });
    });

    unsubscribeRefs.current.push(userUnsubscribe);
    return () => userUnsubscribe();
  };
};