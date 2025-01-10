import { IonButton, IonIcon, IonSpinner, IonText } from "@ionic/react";
import { useUploadImage } from "../logics/Camera";
import { cameraOutline } from "ionicons/icons";

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
            {isLoading ? <IonSpinner name="crescent" /> : <>
                <IonIcon icon={cameraOutline} slot="start" />
                <IonText>Upload Photo / Use Camera</IonText>
            </>}
        </IonButton>
    );
};

export default UploadImage;