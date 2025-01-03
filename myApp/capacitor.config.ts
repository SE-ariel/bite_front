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
  }
};

export default config;
