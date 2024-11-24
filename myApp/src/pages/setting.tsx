import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonModal,
  IonInput, IonItem, IonLabel, IonButtons, IonIcon, IonText
} from '@ionic/react';
import React, { useState } from 'react';
import { bookmarkOutline, lockClosedOutline, homeOutline } from 'ionicons/icons';
import './Home.css';

const Setting: React.FC = () => {
  const userName = "John Doe";
  const userEmail = "johndoe@example.com";
  const [showModal, setShowModal] = useState(false); // State to control modal visibility


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonHeader>
            <IonToolbar>
              <IonTitle style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold' }}>
                Setting
              </IonTitle>
            </IonToolbar>
          </IonHeader>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">setting</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div style={{ padding: '16px', textAlign: 'center' }}>
          {/* Display Name */}
          <IonItem>
            <IonLabel position="stacked">Name</IonLabel>
            <IonText>{userName}</IonText> {/* Displaying the name */}
          </IonItem>

          {/* Display Email */}
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonText>{userEmail}</IonText> {/* Displaying the email */}
          </IonItem>
        </div>

        <div style={{ padding: '10px', textAlign: 'center' }}> {/*  Saved recipes button */}
          <IonButton
            onClick={() => setShowModal(true)}
            expand="block"
            color="danger"
            style={{ height: '40px', fontSize: '20px' }} 
          >
            <IonIcon slot="start" icon={bookmarkOutline} />
            Saved recipes
          </IonButton>
        </div>


        <div style={{ padding: '10px', textAlign: 'center' }}>   {/*Change Password button */}
          <IonButton
            onClick={() => setShowModal(true)}
            expand="block"
            color="danger"
            style={{ height: '40px', fontSize: '20px' }}
          >
            <IonIcon slot="start" icon={lockClosedOutline} />
            Change Password
          </IonButton>
        </div>

        {/* Modal for Change Password */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Change Password</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonItem>
              <IonLabel position="stacked">New Password</IonLabel>
              <IonInput type="password" placeholder="Enter new password" />
            </IonItem>
          </IonContent>

          <div style={{ padding: '16px', textAlign: 'center' }}>
            {/* Confirm Button */}
            <IonButton expand="block" color="primary" onClick={() => alert('Password confirmed!')}>
              Confirm
            </IonButton>
          </div>
        </IonModal>

        <div style={{ backgroundColor: 'white', padding: '10px', textAlign: 'center' }}>
          <IonButton
            href="/home"
            expand="block"
            color="danger"
            style={{ height: '40px', fontSize: '20px' }}
          >
            <IonIcon slot="start" icon={homeOutline} style={{ marginRight: '8px' }} /> {/* Back to Home Page button */}
            Back to Home Page
          </IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Setting;
