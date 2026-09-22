# Lifestyle Fitness PK - Android APK & App Guide

Yeh guide batati hai ke aap is website ko **Android App (.APK file)** me kaise convert kar sakte hain taake aap isko Google Play Store par daal sakein ya direct mobile par install kar sakein.

---

## Method 1: Instant PWA Install (Direct Mobile Phone se - Zero Setup)

Aapki website pehle se hi **Progressive Web App (PWA)** ke tor par mukammal configure hai:

1. Apne Android phone ke Google Chrome browser me website open karein.
2. Top right par **3 dots (Menu)** dabayein.
3. **"Install app"** ya **"Add to Home screen"** par tap karein.
4. Website aapke mobile me ek **mukammal Android App** ki tarah install ho jaegi jisme:
   - Khawar Khan ka app icon
   - Splash screen
   - Bottom navigation bar
   - Full screen (baghair browser bar ke)
   - Fast loading & offline caching

---

## Method 2: Native Android APK Generate Karna (Capacitor & Android Studio)

Agar aapko Google Play Store ke liye ya dosto/clients ko bhejne ke liye **`.apk` file** banani hai:

### Step 1: Capacitor Android CLI Install Karein
Project folder me command prompt open karein:
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

### Step 2: Next.js Static Export
`next.config.mjs` me `output: 'export'` enable karein ya run karein:
```bash
npm run build
```

### Step 3: Android Platform Add Karein
```bash
npx cap add android
```
Is se aapke project me ek `android/` ka folder ban jaega.

### Step 4: Code Sync Karein
```bash
npx cap sync
```

### Step 5: Android Studio me Open Karein
```bash
npx cap open android
```

### Step 6: APK Generate Karein
1. Android Studio open hoga.
2. Top menu me **Build > Build Bundle(s) / APK(s) > Build APK(s)** par click karein.
3. Kuch hi second me aapka **`app-debug.apk`** ya **`app-release.apk`** ready ho jaega!

---

## AdMob Rewarded Ads Integration (For Mobile App)

Jab aap app Play Store par upload karenge to AdMob se real revenue generate karne ke liye:
1. Google AdMob par account banayein.
2. Naya **Rewarded Video Ad Unit** banayein.
3. Ad Unit ID ko Capacitor AdMob plugin (`@capacitor-community/admob`) me paste karein.
4. Website me mojood Rewarded Ad simulator automatically real AdMob video ads serve karne lagega!
