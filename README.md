# bite

Installation
npm install -g @ionic/cli
npm install

you need to add .env.local file under /myApp 

Development
# Start dev server
ionic serve

# Live reload on Android
ionic cap run android -l --external

Building


Web Build
# Production build
ionic build

Android Build
# Build web assets
ionic build

# Add Android platform
ionic cap add android

# Update Android platform
ionic cap sync

# Open in Android Studio
ionic cap open android

Testing
# Unit tests
npm run test.unit

# E2E tests
npm run test.e2e

Project Structure
├── package.json       # Project dependencies
├── android/            # Android platform files
├── public/            # Static assets
├── cypress/             # Test files
├── capacitor.config.ts # Capacitor configuration
├── ionic.config.json   # Ionic configuration
└── src/                # Source files
    ├── components/
    ├── logics/
    ├── tests/
    └── pages/

Features
 - Recipe sharing
 - User authentication (Google, Facebook)
 - Camera integration
 - Push notifications
 - Profile management

 if ionic command does not work, try:
 $env:Path += ";$($env:APPDATA)\npm"
