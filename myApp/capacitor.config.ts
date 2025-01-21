import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'myApp',
  webDir: 'dist',
  plugins: {
    Camera: {
      web: {
        allowImageCapture: true
      }
    },
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ['google.com', 'facebook.com']
    }
  },
  server: {
    androidScheme: 'https',
    allowNavigation: [
      'accounts.google.com',
      '*.google.com',
      'www.googleapis.com',
      'oauth2.googleapis.com',
      'www.facebook.com',
      '*.facebook.com'
    ]
  }
};

export default config;