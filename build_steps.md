# Steps tp build the APK

1. Login Expo
2. run eas build --platform android --profile production
3. Download the AAB file from expo dashboard
4. Bring the aab and bundletool jar in same folder
5. run : java -jar bundletool-all-1.16.0.jar build-apks --bundle=/aab/path --output=/apk/path --mode=universal --ks=your-keystore.jks --ks-key-alias=your-key-alias --ks-pass=pass:<password> --key-pass=pass:<password>
6. Convert apks file to zip and extract it
7. Find the APK file inside the extracted folder
