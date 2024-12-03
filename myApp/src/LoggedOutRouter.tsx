import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import Login from "./test/Login";
import Register from "./test/Register";
import NotFound from "./pages/NotFound";

const LoggedOutRouter: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            {/* Public Routes */}
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            {/* Redirect to login if not logged in */}
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            {/* 404 Route - Always keep this last */}
            <Route path="/404">
              <NotFound />
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

export default LoggedOutRouter;
