import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'GameDeals',
  webDir: 'www',
  plugins: {
    GoogleMaps: {
      apiKey: {
        android: 'AIzaSyBBd5bnjnHm2Jk3UwAedDIl-ihhvGqHihw'
      }
    }
  }
};

export default config;
