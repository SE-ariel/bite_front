import React, { useEffect, useState } from "react";
import {
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
  fetchNotifications,
  handleRefresh,
  formatDate,
} from "../logics/GetNotifications";

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotifications(setNotifications, setLoading, setError);
  }, []);

  return (
    <IonContent>
      <IonRefresher
        slot="fixed"
        onIonRefresh={(e) =>
          handleRefresh(e, setNotifications, setLoading, setError)
        }
      >
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
              <IonNote slot="end">{formatDate(notification.createdAt)}</IonNote>
            </IonItem>
          );
        })}
      </IonList>

      {notifications.length === 0 && !loading && (
        <IonTitle>No recent notifications</IonTitle>
      )}
    </IonContent>
  );
};

export default Notifications;
