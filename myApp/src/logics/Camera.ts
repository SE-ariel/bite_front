import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import imageCompression from 'browser-image-compression';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useEffect, useState } from 'react';
import { useCallback } from 'react';

export const useUploadImage = (documentId: string) => {
    const uploadImage = useCallback(async () => {
        const image = await captureImage();
        const compressedImage = await compressImage(image);
        await uploadImageToFirestore(compressedImage, documentId);
    }, [documentId]);

    useEffect(() => {
        uploadImage();
    }, [uploadImage]);
    return uploadImage;
};

const captureImage = async () => {
  console.log("capture Image");
  await Camera.requestPermissions();
  const image = await Camera.getPhoto({
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Prompt, // Allows user to choose between camera and gallery
    quality: 50, // Adjust quality as needed
  });
  console.log("image found");

  return image.dataUrl as string;
};

export const compressImage = async (dataUrl: string): Promise<string> => {
  const file = dataURLtoFile(dataUrl, 'image.jpg');
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 800,
    useWebWorker: true,
  };
  const compressedFile = await imageCompression(file, options);
  return await fileToDataUrl(compressedFile) as string;
};

// Helper function to convert Data URL to File
const dataURLtoFile = (dataurl: string, filename: string) => {
  const arr = dataurl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : '';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

// Helper function to convert File to Data URL
const fileToDataUrl = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        resolve(e.target.result);
      } else {
        reject(new Error('FileReader target is null'));
      }
    };
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
};

export const uploadImageToFirestore = async (imageDataUrl: string, documentId: string) => {
  const imageBase64 = imageDataUrl.split(',')[1]; // Remove the Data URL prefix
  const imageData = {
    image: imageBase64,
    // Add other fields as necessary
  };
  await setDoc(doc(db, 'recipes', documentId), imageData);
};

export const getImageFromFirestore = async (documentId: string) => {
    const docRef = doc(db, 'recipes', documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const imageBase64 = docSnap.data().image;
      return `data:image/jpeg;base64,${imageBase64}`;
    } else {
      console.log('No such document!');
    }
  };

export const DisplayImage = ({ documentId }: { documentId: string }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const imageDataUrl = await getImageFromFirestore(documentId);
      if (imageDataUrl) {
        setImageSrc(imageDataUrl);
      } else {
        setImageSrc(null);
      }
    };
    fetchImage();
  }, [documentId]);

  return imageSrc;
};