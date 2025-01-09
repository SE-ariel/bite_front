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
} from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";

export const useNotifications = () => {
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      initializePushNotifications();
    }
  }, []);

  useEffect(() => {
    listenForNewPosts();
  }, []);
};

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
        id: new Date().getTime(),
        schedule: { at: new Date(Date.now() + 1000) },
        sound: undefined,
        attachments: undefined,
        actionTypeId: "",
        extra: null,
      },
    ],
  });
};
const listenForNewPosts = () => {
  if (auth.currentUser) {
    const uid = auth.currentUser.uid;
    const userDoc = doc(db, "users", uid);

    onSnapshot(userDoc, async (docSnapshot) => {
      const userData = docSnapshot.data();
      if (!userData?.following) return;
      const recipesRef = collection(db, "recipes");
      const q = query(
        recipesRef,
        where("creatorId", "in", userData.following),
        orderBy("createdAt", "desc"), // Order by creation time
        limit(1) // Limit to most recent recipe
      );
      onSnapshot(q, async (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === "added") {
            const recipe = change.doc.data();
            const creatorDoc = await getDoc(doc(db, "users", recipe.creatorId));
            const creatorData = creatorDoc.data();
            if (creatorData) {
              const creatorName = `${creatorData.firstName} ${creatorData.surName}`;
              // Send local notification
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
    });
  }
};
