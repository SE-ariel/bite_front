import React, { useEffect } from 'react';
import { IonApp, setupIonicReact } from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import { useLoggedIn } from "./logics/IsLoggedIn";
import Loading from "./pages/Loading";
import LoggedInRouter from "./LoggedInRouter";
import LoggedOutRouter from "./LoggedOutRouter";
import { useNotifications } from './logics/Notifications';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    const initAuth = async () => {
      // Initialize Firebase Authentication
      const unsubscribe = await FirebaseAuthentication.addListener('authStateChange',
        async (change) => {
          console.log('Auth state changed:', change);
          if (change.user) {
            // User is signed in
            console.log('User authenticated:', change.user);
          }
        });

      return () => {
        unsubscribe.remove();
      };
    };

    initAuth();
  }, []);

  const { isLoggedIn, isLoading } = useLoggedIn();

  useNotifications();

  if (isLoading) {
    return (
      <IonApp>
        <Loading />
      </IonApp>
    );
  } else {
    if (isLoggedIn) {
      return <LoggedInRouter />;
    } else {
      return <LoggedOutRouter />;
    }
  }
};

export default App;