import { IonButton, IonSpinner } from "@ionic/react";
import { useState } from "react";
import { useUploadImage } from "../logics/Camera";

interface Props {
    id: string;
}

const UploadImage: React.FC<Props> = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const uploadImage = useUploadImage(props.id);

    const handleUpload = async () => {
        setIsLoading(true);
        try {
            await uploadImage();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <IonButton 
            onClick={handleUpload} 
            disabled={isLoading}
        >
            {isLoading ? <IonSpinner name="crescent" /> : 'Upload Image'}
        </IonButton>
    );
};

export default UploadImage;