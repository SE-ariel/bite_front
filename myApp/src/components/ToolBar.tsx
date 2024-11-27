import { IonButtons, IonTitle, IonToolbar } from '@ionic/react';
import './ToolBar.css';
import BackButton from './BackButton';
import LogOut from './LogOut';

interface Props {
    title: string;
}

const ToolBar: React.FC<Props> = (props) => {
  return (
    <IonToolbar>
        <IonButtons>
            <BackButton/>
            <IonTitle slot='end' size="large" color='danger'>
                {props.title}
            </IonTitle>
            <LogOut/>
        </IonButtons>
    </IonToolbar>
  );
};

export default ToolBar;
