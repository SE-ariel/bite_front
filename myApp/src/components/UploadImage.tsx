import { IonButton } from "@ionic/react";
import { useUploadImage } from "../logics/Camera";
interface Props {
    id: string;
}

const UploadImage: React.FC<Props> = (props) => {
    const uploadImage = useUploadImage(props.id);
    return (
        <IonButton onClick={ () => uploadImage()}>Upload Image</IonButton>
    );
};

export default UploadImage;
