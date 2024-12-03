import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonModal,
  IonInput, IonItem, IonLabel, IonButtons, IonIcon, IonText
} from '@ionic/react';
import React, { useState } from 'react';
import { bookmarkOutline, lockClosedOutline, homeOutline } from 'ionicons/icons';
import './setting.css'; 

const Setting: React.FC = () => {
  const userName = "John Doe";
  const userEmail = "johndoe@example.com";
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title">Setting</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="content-padding">
          {/* Display Name */}
          <IonItem>
            <IonLabel position="stacked">Name</IonLabel>
            <IonText>{userName}</IonText>
          </IonItem>

          {/* Display Email */}
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonText>{userEmail}</IonText>
          </IonItem>
        </div>

        {/* Saved Recipes Button */}
        <div className="content-button-container">
          <IonButton expand="block" color="danger">
            <IonIcon slot="start" icon={bookmarkOutline} />
            Saved Recipes
          </IonButton>
        </div>

        {/* Change Password Button */}
        <div className="content-button-container">
          <IonButton onClick={handleShowModal} expand="block" color="danger">
            <IonIcon slot="start" icon={lockClosedOutline} />
            Change Password
          </IonButton>
        </div>

        {/* Change Password Modal */}
        <IonModal isOpen={showModal} onDidDismiss={handleCloseModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Change Password</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={handleCloseModal}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonItem>
              <IonLabel position="stacked">New Password</IonLabel>
              <IonInput type="password" placeholder="Enter new password" />
            </IonItem>
            <div className="modal-container">
              <IonButton expand="block" color="primary" onClick={() => alert('Password confirmed!')}>
                Confirm
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        {/* Back to Home Button */}
        <div className="content-button-container">
          <IonButton href="/home" expand="block" color="danger">
            <IonIcon slot="start" icon={homeOutline} className="home-icon" />
            Back to Home Page
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Setting;
