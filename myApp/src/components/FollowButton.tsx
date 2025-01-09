import React from "react";
import { IonButton } from "@ionic/react";
import { useFollowState } from "../logics/Follow";
import { auth } from "../firebaseConfig";
import { c } from "vitest/dist/reporters-5f784f42";

interface Props {
  otherUserID: string;
}

const FollowButton: React.FC<Props> = ({ otherUserID }) => {
  const { followed, isLoading, handleFollowAction } = useFollowState(otherUserID);
  if (auth.currentUser?.uid === otherUserID) return null;

  return (
    <IonButton onClick={handleFollowAction} disabled={isLoading}>
      {isLoading ? 'Processing...' : followed ? 'Unfollow' : 'Follow'}
    </IonButton>
  );
};

export default FollowButton;