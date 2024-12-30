import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LoggedInFrame from "./pages/LoggedInFrame";
import PrivateZone from "./pages/PrivateZone";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Loading from "./pages/Loading";
import SetUpProfile from "./pages/SetupProfile";

const LoggedInRouter: React.FC = () => {
  const [isUserChecked, setIsUserChecked] = useState(false);
  const [needsSetup, setNeedsSetup] = useState(false);

  useEffect(() => {
    const checkUserProfile = async () => {
      const user = auth.currentUser; 
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        
        if (!userSnap.exists() || !userSnap.data().firstName) {
          setNeedsSetup(true);
        }
      }
      setIsUserChecked(true);
    };

    checkUserProfile();
  }, []);

  if (!isUserChecked) {
    return <Loading />;
  }

  return (
    <IonApp>
      <IonReactRouter>
        {/* הפנייה אוטומטית לדף setup אם המשתמש צריך להשלים פרטים */}
        {needsSetup && <Redirect to="/setup" />}
        
        <IonRouterOutlet>
          <Switch>
            {/* Public Routes */}
            <Route path="/setup" component={SetUpProfile} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
             {/* Logged In Routes - Only render if logged in */}
            <Route exact path="/home">
              <LoggedInFrame title="home" wrappedContent={Home} />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/private">
              <LoggedInFrame
                title="private zone"
                wrappedContent={PrivateZone}
              />
            </Route>
            <Route exact path="/settings">
              <LoggedInFrame title="settings" wrappedContent={Settings} />
            </Route>
            {/* Dynamic Profile Route */}
            <Route path="/profile/:id?">
              <LoggedInFrame title="profile" wrappedContent={Loading} />
            </Route>
            {/* Dynamic Profile Route */}
            <Route path="/recipe/:id?">
              <LoggedInFrame title="profile" wrappedContent={Loading} />
            </Route>
            {/* 404 Route - Always keep this last */}
            <Route path="*">
              <Redirect to="/404" />
            </Route>
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default LoggedInRouter;
