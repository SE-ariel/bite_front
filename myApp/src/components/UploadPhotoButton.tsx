import React from 'react';
import './UploadPhotoButton.css';

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
        <div className="upload-photo-button">
            <label htmlFor="photo-upload" className="photo-label">Upload Photo / Use Camera</label>
            <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden-input"
            />
        </div>
    );
};

export default UploadPhotoButton;