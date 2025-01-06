import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import imageCompression from 'browser-image-compression';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useEffect, useState, useRef } from 'react';
import { useCallback } from 'react';
import { Capacitor } from '@capacitor/core';

export const useUploadImage = (documentId: string) => {
    const uploadImage = useCallback(async () => {
        const image = await captureImage();
        if (image) {
            const compressedImage = await compressImage(image);
            await uploadImageToFirestore(compressedImage, documentId);
        }
    }, [documentId]);

    useEffect(() => {
        uploadImage();
    }, [uploadImage]);
    return uploadImage;
};

const captureImage = async (): Promise<string | null> => {
    console.log("capture Image");
    
    if (Capacitor.isNativePlatform()) {
        // Use Capacitor Camera on native platforms
        try {
            await Camera.requestPermissions();
            const image = await Camera.getPhoto({
                resultType: CameraResultType.DataUrl,
                source: CameraSource.Prompt,
                quality: 50,
            });
            console.log("image found");
            return image.dataUrl as string;
        } catch (error) {
            console.error('Error capturing image:', error);
            return null;
        }
    } else {
        // Use file input for web
        return new Promise((resolve) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            
            input.onchange = async (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        resolve(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                } else {
                    resolve(null);
                }
            };
            
            input.click();
        });
    }
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
  await setDoc(doc(db, 'images', documentId), imageData);
};

export const getImageFromFirestore = async (documentId: string) => {
    const docRef = doc(db, 'images', documentId);
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

export const useFirestoreImage = (documentId: string) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);
      try {
        const imageDataUrl = await getImageFromFirestore(documentId);
        setImageSrc(imageDataUrl || null);
      } catch (error) {
        console.error('Error fetching image:', error);
        setImageSrc(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchImage();
  }, [documentId]);

  return { imageSrc, isLoading };
};