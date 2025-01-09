import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonToast,
} from "@ionic/react";
import { timeOutline, documentTextOutline } from "ionicons/icons";
import {
  Notification,
  getRecentNotifications,
} from "../logics/GetNotifications";
import { format } from "date-fns";

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      // Replace 'YOUR_USER_ID' with actual user ID from your auth system
      const data = await getRecentNotifications();
      setNotifications(data);
    } catch (err) {
      setError("Failed to load notifications");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleRefresh = async (event: CustomEvent) => {
    await fetchNotifications();
    event.detail.complete();
  };

  const formatDate = (timestamp: any) => {
    const date = timestamp.toDate();
    return format(date, "MMM d, yyyy h:mm a");
  };

  return (
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {loading && <IonSpinner />}

        {error && (
          <IonToast
            isOpen={!!error}
            message={error || ""}
            duration={3000}
            color="danger"
            onDidDismiss={() => setError(null)}
          />
        )}

        <IonList>
          {notifications.map((notification) => {
            const linkToRecipe = `/recipe/${notification.recipeId}`;
            return (
              <IonItem
                href={linkToRecipe}
                key={notification.id}
                className={notification.read ? "" : "unread"}
              >
                <IonIcon
                  icon={
                    notification.type === "new_recipe"
                      ? documentTextOutline
                      : timeOutline
                  }
                  slot="start"
                />
                <IonLabel>
                  <h2>{notification.title}</h2>
                  <p>{notification.body}</p>
                </IonLabel>
                <IonNote slot="end">
                  {formatDate(notification.createdAt)}
                </IonNote>
              </IonItem>
            );
          })}
        </IonList>

        {notifications.length === 0 && !loading && (
          <IonTitle>
            No recent notifications
          </IonTitle>
        )}
      </IonContent>
  );
};

export default Notifications;
