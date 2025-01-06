import { IonImg, IonSkeletonText, IonText } from '@ionic/react';
import { useFirestoreImage } from '../logics/Camera';

interface Props {
  documentId: string;
}

const ImageDisplay: React.FC<Props> = ({ documentId }) => {
  const { imageSrc, isLoading } = useFirestoreImage(documentId);

  if (isLoading) {
    return <IonSkeletonText animated style={{ width: '100%', height: '200px' }} />;
  }

  if (!imageSrc) {
    return <IonText color="medium">No image available</IonText>;
  }

  return <IonImg src={imageSrc} alt="Uploaded content" />;
};

export default ImageDisplay;