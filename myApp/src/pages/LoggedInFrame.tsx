import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";
import Header from "../components/Header";
import { useLocation } from "react-router";
import { useProfile } from "../logics/Profile";
import Profile from "./Profile";
import NotFound from "./NotFound";
import Loading from "./Loading";

interface Props {
  title: string;
  wrappedContent: React.ComponentType;
}

interface ProfileProps {
  title: string;
  path: string;
}

const ProfileLogic: React.FC<ProfileProps> = (profileProps) => {
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
            <Profile userData={userData} />
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
