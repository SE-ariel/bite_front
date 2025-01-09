import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";
import Header from "../components/Header";
import { useLocation } from "react-router";
import { useProfile } from "../logics/Profile";
import { useRecipe } from "../logics/GetRecipe";
import Profile from "./Profile";
import NotFound from "./NotFound";
import Loading from "./Loading";
import Recipe from "./Recipe";

interface Props {
  title: string;
  wrappedContent: React.ComponentType;
}

interface PathProps {
  title: string;
  path: string;
}

const ProfileLogic: React.FC<PathProps> = (profileProps) => {
  const { userData, isChecked } = useProfile(profileProps.path);
  console.log(userData, isChecked);
  if (isChecked) {
    if (userData.email == "") {
      return <NotFound />;
    } else {
      return (
        <IonPage>
          <Header title={profileProps.title} />
          <IonContent>
            <Profile userData={userData} userID={profileProps.path} />
          </IonContent>
        </IonPage>
      );
    }
  } else {
    return <Loading />;
  }
};

const RecipeLogic: React.FC<PathProps> = (recipeProps) => {
  const { recipeData, isChecked } = useRecipe(recipeProps.path);
  console.log(recipeData, isChecked);
  if (isChecked) {
    if (recipeData.title == "") {
      return <NotFound />;
    } else {
      return (
        <IonPage>
          <Header title={recipeProps.title} />
          <IonContent>
            <Recipe recipeData={recipeData} />
          </IonContent>
        </IonPage>
      );
    }
  } else {
    return <Loading />;
  }
};

const LoggedInFrame: React.FC<Props> = (props) => {
  const location = useLocation();
  const path = location.pathname.split("/");
  if (path[1] == "profile") {
    return <ProfileLogic title={props.title} path={path[2]} />;
  } else if (path[1] == "recipe") {
    return <RecipeLogic title={props.title} path={path[2]} />;
  } else {
    return (
      <IonPage>
        <Header title={props.title} />
        <IonContent>
          <props.wrappedContent />
        </IonContent>
      </IonPage>
    );
  }
};

export default LoggedInFrame;
