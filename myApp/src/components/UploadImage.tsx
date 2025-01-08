import { IonButton, IonSpinner } from "@ionic/react";
import { useUploadImage } from "../logics/Camera";

interface Props {
    onUpload?: (id: string) => void;
}

const UploadImage: React.FC<Props> = ({ onUpload }) => {
    const { handleUpload, isLoading } = useUploadImage(onUpload);

    return (
        <IonButton 
            expand="block"
            onClick={handleUpload} 
            disabled={isLoading}
        >
            {isLoading ? <IonSpinner name="crescent" /> : 'Upload Image'}
        </IonButton>
    );
};

export default UploadImage;