import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonPage } from "@ionic/react";

const NotFound: React.FC = () => {
  return (
    <IonPage>

      <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                404
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              hahaha
            </IonCardContent>
          </IonCard>
          
          </IonContent>
    </IonPage>
  );
};

export default NotFound;
