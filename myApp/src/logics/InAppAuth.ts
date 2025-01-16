import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithCredential,
  AuthProvider,
  signInWithCustomToken
} from "firebase/auth";
import { auth } from "../firebaseConfig";

export const useInAppAuth = () => {
  const handleSocialLogin = async (providerType: string) => {
    // Only use in-app browser on mobile devices
    if (Capacitor.isNativePlatform()) {
      try {
        const provider = getProvider(providerType);
        
        // Configure auth provider
        (provider as GoogleAuthProvider | FacebookAuthProvider).setCustomParameters({
          prompt: 'select_account',
          redirect_uri: 'your-app-scheme://auth-callback' // Replace with your app's scheme
        });

        // Get auth URL
        const authUrl = getAuthUrl(provider);
        
        // Open in-app browser
        await Browser.open({ url: authUrl });
        
        // Add listener for the auth callback
        Browser.addListener('browserPageLoaded', async (data: any) => {
          if (data.url?.includes('auth-callback')) {
            await Browser.close();
            
            // Extract token from URL
            const token = extractTokenFromUrl(data.url);
            if (token) {
              try {
                // Sign in with custom token
                await signInWithCustomToken(auth, token);
                // Navigate to home or handle success
              } catch (error) {
                console.error('Error signing in with token:', error);
              }
            }
          }
        });

      } catch (error) {
        console.error('Social auth error:', error);
        throw error;
      }
    } else {
      // Fallback to popup for web
      const provider = getProvider(providerType);
      // Your existing web authentication logic here
    }
  };

  const getProvider = (providerType: string): AuthProvider => {
    switch (providerType) {
      case 'Google':
        return new GoogleAuthProvider();
      case 'Facebook':
        return new FacebookAuthProvider();
      default:
        throw new Error('Unsupported provider');
    }
  };

  const getAuthUrl = (provider: AuthProvider): string => {
    const baseUrl = 'https://your-auth-domain.firebaseapp.com/__/auth/handler';
    const params = new URLSearchParams({
      providerId: provider.providerId,
      appId: 'your-app-id', // Replace with your Firebase app ID
      apiKey: 'your-api-key', // Replace with your Firebase API key
      authType: 'signInWithRedirect',
      // Add any additional parameters needed
    });

    return `${baseUrl}?${params.toString()}`;
  };

  const extractTokenFromUrl = (url: string): string | null => {
    const params = new URLSearchParams(url.split('?')[1]);
    return params.get('token');
  };

  return {
    handleSocialLogin
  };
};