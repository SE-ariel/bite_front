import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonItem,
  IonText,
} from "@ionic/react";
import "./Home.css";
import { UserData } from "../logics/Profile";
import FollowButton from "../components/FollowButton";

interface Props {
  userData: UserData;
  userID: string;
}

const Profile: React.FC<Props> = (props) => {
  return (
    <IonContent fullscreen>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>User Profile</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonItem>
            <IonText>First Name: {props.userData.firstName}</IonText>
          </IonItem>
          <IonItem>
            <IonText>Last Name: {props.userData.lastName}</IonText>
          </IonItem>
          <IonItem>
            <IonText>Role: {props.userData.role}</IonText>
          </IonItem>
        </IonCardContent>
      </IonCard>
      <FollowButton otherUserID={props.userID} />
    </IonContent>
  );
};

export default Profile;
