// import React from 'react';
// import { IonButton, IonIcon } from '@ionic/react';
// import { cameraOutline } from 'ionicons/icons';

// interface UploadPhotoButtonProps {
//     onPhotoUpload: (file: File) => void;
// }

// const UploadPhotoButton: React.FC<UploadPhotoButtonProps> = ({ onPhotoUpload }) => {
//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             onPhotoUpload(e.target.files[0]);
//         }
//     };

//     return (
//         <div>
//             {/* Hidden input for file selection */}
//             <input
//                 id="photo-upload"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 style={{ display: 'none' }}
//             />

//             {/* Styled Ionic Button */}
//             <IonButton
//                 color="primary"
//                 expand="block"
//                 onClick={() => document.getElementById('photo-upload')?.click()} // Opens file input
//             >
//                 <IonIcon icon={cameraOutline} slot="start" />
//                 Upload Photo / Use Camera
//             </IonButton>
//         </div>
//     );
// };

// export default UploadPhotoButton;

import React, { useState } from "react";
import { IonButton, IonIcon, IonSpinner } from "@ionic/react";
import { cameraOutline } from "ionicons/icons";
import { captureImage, compressImage } from "../logics/Camera";

interface UploadPhotoButtonProps {
    onPhotoUpload: (imageDataUrl: string) => void; // Pass the compressed base64 image directly
}

const UploadPhotoButton: React.FC<UploadPhotoButtonProps> = ({ onPhotoUpload }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setIsLoading(true);
            try {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = async () => {
                    const dataUrl = reader.result as string;
                    const compressedImage = await compressImage(dataUrl);
                    onPhotoUpload(compressedImage); // Pass the compressed image
                };
                reader.readAsDataURL(file);
            } catch (error) {
                console.error("Error processing image:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleCaptureImage = async () => {
        setIsLoading(true);
        try {
            const capturedImage = await captureImage();
            if (capturedImage) {
                const compressedImage = await compressImage(capturedImage);
                onPhotoUpload(compressedImage); // Pass the compressed image
            }
        } catch (error) {
            console.error("Error capturing image:", error);
        } finally {
            setIsLoading(false);
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
                style={{ display: "none" }}
            />

            {/* Styled Ionic Button */}
            <IonButton
                color="primary"
                expand="block"
                onClick={() => document.getElementById("photo-upload")?.click()} // Opens file input
                disabled={isLoading}
            >
                {isLoading ? (
                    <IonSpinner name="crescent" />
                ) : (
                    <>
                        <IonIcon icon={cameraOutline} slot="start" />
                        Upload Photo
                    </>
                )}
            </IonButton>

            {/* Capture photo using the device camera */}
            <IonButton
                color="primary" // Same color as Upload Photo button
                expand="block"
                onClick={handleCaptureImage}
                disabled={isLoading}
            >
                {isLoading ? (
                    <IonSpinner name="crescent" />
                ) : (
                    <>
                        <IonIcon icon={cameraOutline} slot="start" />
                        Use Camera
                    </>
                )}
            </IonButton>
        </div>
    );
};

export default UploadPhotoButton;


