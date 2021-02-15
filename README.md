# CirrusMD SDK Bridge Library

Library for CirrusMD SDK RN bridge, for both IOS and Android.

[![npm](https://img.shields.io/npm/v/react-native-vbt-cirrusmd-bridge-library)](https://www.npmjs.com/package/react-native-vbt-cirrusmd-bridge-library)

# Example Application
 To run example app clone the project, run `yarn` (bob will install all deps), start the app with `yarn example ios` or `yarn example android`.
 
 # Usage
 ```js
 import VbtCirrusmdBridgeLibrary from 'react-native-vbt-cirrusmd-bridge-library'; //import Library
 ```
 ### IOS
```js
VbtCirrusmdBridgeLibrary.loginIos(sdkid, patientid, secret);
VbtCirrusmdBridgeLibrary.loadIosView()
```
### Android
```js
VbtCirrusmdBridgeLibrary.loginAndroid(sdkid, patientid.toString(), secret);
VbtCirrusmdBridgeLibrary.loadAndroidView()
``` 
 
# Installation

```js
npm install react-native-vbt-cirrusmd-bridge-library
```

#### IOS
For IOS you will need to add [CirrusMD SDK](https://github.com/CirrusMD/CirrusMD-iOS-SDK-Example) in your project in order to work.
#### Adding CirrusMD SDK
Install Cocoapods:
```gem install cocoapods```

Customize project podfile:
```
require_relative '../node_modules/react-native-unimodules/cocoapods.rb'
source 'https://github.com/CocoaPods/Specs.git'
source 'https://github.com/CirrusMD/podspecs.git'
```
Change platform version for IOS:
```platform :ios, '12.0'```

In your app target add:
```
use_frameworks!
use_unimodules!
pod 'CirrusMDSDK','~> 6.2.0'
pod 'AwaitKit', '~> 5.2.0'
pod 'PromiseKit', '~> 6.13.1'
```
And in dependencies in `package.json` add next line: ``` "react-native-unimodules": "~0.11.0"```

Because we are using ```use_frameworks``` flag you should also disable flipper.

Run `yarn` to install all dependencies, run `pod install` in ios folder to update pods, run `react-native run-ios` to start app.

#### Android
In order to work on android you must:

##### In `build.gradle` (project level)
Change minimum SDK version `minSdkVersion = 24` ,
build tools version `classpath("com.android.tools.build:gradle:3.6.1")`,
and make sure you have next deps in `allprojects -> repositories`
```
maven { url "https://appboy.github.io/appboy-android-sdk/sdk" }
maven { url "http://tokbox.bintray.com/maven" }
google()
jcenter()
maven { url 'https://www.jitpack.io' }
```

# Common build failed errors
### Error with auto-linked libraries
```
ld: warning: Could not find or use auto-linked library 'swiftWebKit'
ld: warning: Could not find or use auto-linked library 'swiftCoreMIDI'
ld: warning: Could not find or use auto-linked library 'swiftUniformTypeIdentifiers'
```
Navigate to your ios folder and create `File.swift` file. You just need to have `import Foundation` on top.

### The iOS Simulator deployment target 'IPHONEOS_DEPLOYMENT_TARGET' is set to 8.0

Open IOS folder in xcode, go to build settings, search for `IOS Deployment Target` and set it to `12`.

### Error: Failed to install the app. Make sure you have the Android development environment set up
Make sure your ANDROID_SDK_PATH is set.
If you don't have it just open yourApp/android folder in android studio and it should automatically add sdk.dir in `local.properties`.


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
