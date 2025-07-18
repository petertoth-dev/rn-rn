#!/bin/bash
# ReactNative script to clean the project

echo "                              ____                      "
echo "                      __,-~~/~    \`---.                 "
echo "                    _/_,---(      ,    )                "
echo "                __ /        <    /   )  \___            "
echo "               ====------------------===;;;==           "
echo "                   \/  ~\"~\"~\"~\"~\"~\~\"~)~\",1/            "
echo "                   (_ (   \  (     >    \)              "
echo "                    \_( _ <         >_>'                "
echo "                       ~ \`-i' ::>|--\"                   "
echo "                           I;|.|.|                      "
echo "                          <|i::|i|>                     "
echo "                           |[::|.|                      "
echo "                            ||: |                       "
echo "______________________REACT NATIVE NUKE________________ "

# Stop cached listeners
watchman watch-del-all

# clean-node-modules
rm -rf node_modules package-lock.json

# Install only fresh copies
#yarn cache clean && yarn
npm i

# clean-pods
cd ios/ && rm -rf build Pods Podfile.lock Gemfile.lock && pod repo update && pod install && cd ../

# clean-ios
rm -rf ios/build && rm -rf ~/Library/Developer/Xcode/DerivedData && rm -rf ./ios/DerivedData

# clean-android
cd android && ./gradlew clean && rm -rf /app/build && cd ..

# clean-rn-cache
rm -rf $TMPDIR/react-* && rm -rf $TMPDIR/react-native-packager-cache-* && rm -rf $TMPDIR/metro-bundler-cache-* && yarn cache clean && watchman watch-del-all

echo -e "\x1B[32m_________________________________________________________________ \x1B[0m"
echo -e "\x1B[32m______________________REACT NATIVE NUKE COMPLETED________________ \x1B[0m"
echo -e "\x1B[32m_________________________________________________________________ \x1B[0m"
