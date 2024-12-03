import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonModal, IonLabel, IonInput, IonItem, IonText } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import './setting.css';

import BackButton from "../components/BackButton";

import InputField from "../components/InputField";  // Import the InputField component

const Setting: React.FC = () => {
  const [userName, setUserName] = useState("John Doe");
  const [userEmail, setUserEmail] = useState("johndoe@example.com");
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSaveChanges = () => {
    console.log("Changes saved!");
    setIsEditing(false); // Disable editing after save
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {/* Back Button */}
          <BackButton />
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="content-padding">
          {/* Name Field */}
          <IonItem>
            <IonLabel position="stacked">Username</IonLabel>
            <IonText>{userName}</IonText>
          </IonItem>

          {/* Email Field */}
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonText>{userEmail}</IonText>
          </IonItem>

          {/* Editable Name and Email */}
          <div>
            <InputField
              label="Username"
              value={userName}
              onChange={(value) => setUserName(value)}
            />
            <InputField
              label="Email"
              value={userEmail}
              onChange={(value) => setUserEmail(value)}
            />
          </div>

          {/* Save Changes Button */}
          {isEditing && (
            <IonButton expand="block" color="success" onClick={handleSaveChanges}>
              Save Changes
            </IonButton>
          )}

          {/* Change Password Button */}
          <div className="content-button-container">
            <IonButton onClick={handleShowModal} expand="block" color="danger">
              Change Password
            </IonButton>
          </div>

          {/* Change Password Modal */}
          <IonModal isOpen={showModal} onDidDismiss={handleCloseModal}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Change Password</IonTitle>
                <IonButton slot="end" onClick={handleCloseModal}>Close</IonButton>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonItem>
                <IonLabel position="stacked">New Password</IonLabel>
                <IonInput
                  type="password"
                  value={newPassword}
                  onIonChange={(e) => setNewPassword(e.detail.value!)}
                  placeholder="Enter new password"
                />
              </IonItem>
              <div className="modal-container">
                <IonButton
                  expand="block"
                  color="primary"
                  onClick={() => alert('Password changed!')}
                >
                  Confirm
                </IonButton>
              </div>
            </IonContent>
          </IonModal>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Setting;
