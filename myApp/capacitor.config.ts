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
    }
  },
  server: {
    androidScheme: 'https',
    allowNavigation: [
      'accounts.google.com',
      'www.facebook.com',
      'auth.firebase.com',
      'google.com'
    ]
  },
  ios: {
    scheme: 'myapp'
  },
  android: {
    //scheme: 'myapp'
  }
};

export default config;