import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import PostTitleField from '../components/PostTitleField';
import PostContentField from '../components/PostContentField';
import UploadPhotoButton from '../components/UploadPhotoButton';
import ToolBar from '../components/ToolBar';
import './CreatePost.css';

const CreatePost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);

    const handlePhotoUpload = (file: File) => {
        setPhoto(file);
    };

    const handlePostUpload = () => {
        const postData = { title, content, photo };
        console.log('Uploading post:', postData);
        alert('Post uploaded successfully!');
    };

    const isFormValid = title.trim() !== '' && content.trim() !== '' && photo !== null;

    return (
        <IonPage>
            <IonHeader>
                <ToolBar title="Create a Recipe" />
            </IonHeader>
            <IonContent fullscreen>
                <div className="create-post-container">
                    <UploadPhotoButton onPhotoUpload={handlePhotoUpload} />
                    <PostTitleField title={title} setTitle={setTitle} />
                    <PostContentField content={content} setContent={setContent} />
                    <IonButton
                        expand="block"
                        onClick={handlePostUpload}
                        color="danger"
                        disabled={!isFormValid}
                        className="upload-button"
                    >
                        Upload Recipe
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default CreatePost;
