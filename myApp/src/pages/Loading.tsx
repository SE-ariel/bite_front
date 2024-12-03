import { IonContent, IonPage, IonSpinner } from "@ionic/react";

const Loading: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding ion-text-center">
        <IonSpinner
          color="primary"
          style={{
            marginTop: "200px",
            width: "100px",
            height: "100px",
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default Loading;
