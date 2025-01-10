import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useState, useEffect } from 'react';
import { useIonToast } from '@ionic/react';

export const useFollowState = (otherUserID: string) => {
  const [followed, setFollowed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [present] = useIonToast();

  useEffect(() => {
    const initializeFollowState = async () => {
      if (!otherUserID || !auth.currentUser) return;
      const isFollowing = await checkIfFollowing(otherUserID);
      setFollowed(isFollowing);
    };
    initializeFollowState();
  }, [otherUserID]);

  const handleFollowAction = async () => {
    if (!otherUserID || !auth.currentUser) {
      present({
        message: 'Unable to perform action. Please try again later.',
        duration: 2000,
        color: 'danger'
      });
      return;
    }

    setIsLoading(true);
    try {
      if (followed) {
        await unfollowUser(otherUserID);
      } else {
        await followUser(otherUserID);
      }
      setFollowed(!followed);
    } catch (error) {
      present({
        message: 'Failed to update follow status',
        duration: 2000,
        color: 'danger'
      });
    }
    setIsLoading(false);
  };

  return { followed, isLoading, handleFollowAction };
};

export const checkIfFollowing = async (targetUserId: string): Promise<boolean> => {
  if (!auth.currentUser) return false;
  
  const currentUserRef = doc(db, "users", auth.currentUser.uid);
  const userDoc = await getDoc(currentUserRef);
  
  if (!userDoc.exists()) return false;
  
  const following = userDoc.data()?.following || [];
  return following.includes(targetUserId);
};

export const followUser = async (followUserId: string) => {
  if (auth.currentUser) {
    const currentUserRef = doc(db, "users", auth.currentUser.uid);
    const followUserRef = doc(db, "users", followUserId);

    await updateDoc(currentUserRef, {
      following: arrayUnion(followUserId),
    });

    await updateDoc(followUserRef, {
      followers: arrayUnion(auth.currentUser.uid),
    });
  }
};

export const unfollowUser = async (unfollowUserId: string) => {
  if (auth.currentUser) {
    const currentUserRef = doc(db, "users", auth.currentUser.uid);
    const unfollowUserRef = doc(db, "users", unfollowUserId);

    await updateDoc(currentUserRef, {
      following: arrayRemove(unfollowUserId),
    });

    await updateDoc(unfollowUserRef, {
      followers: arrayRemove(auth.currentUser.uid),
    });
  }
};
