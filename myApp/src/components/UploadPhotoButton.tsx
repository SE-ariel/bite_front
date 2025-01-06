import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { cameraOutline } from 'ionicons/icons';

interface UploadPhotoButtonProps {
    onPhotoUpload: (file: File) => void;
}

const UploadPhotoButton: React.FC<UploadPhotoButtonProps> = ({ onPhotoUpload }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onPhotoUpload(e.target.files[0]);
        }
    };

    return (
        <div>
            {/* Hidden input for file selection */}
            <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            {/* Styled Ionic Button */}
            <IonButton
                color="primary"
                expand="block"
                onClick={() => document.getElementById('photo-upload')?.click()} // Opens file input
            >
                <IonIcon icon={cameraOutline} slot="start" />
                Upload Photo / Use Camera
            </IonButton>
        </div>
    );
};

export default UploadPhotoButton;
