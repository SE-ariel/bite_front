import { DisplayImage } from "../logics/Camera";
interface Props {
    id: string;
}

const GetImage: React.FC<Props> = (props) => {
    const imageSrc = DisplayImage({ documentId: props.id });
    if(imageSrc){
        return(<img src={imageSrc} alt="Recipe" />);
    }
    else{
        return(<p>Loading image...</p>);
    }
};

export default GetImage;
