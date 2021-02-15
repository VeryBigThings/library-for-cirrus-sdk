# CirrusMD SDK Bridge Library

Library for CirrusMD SDK RN bridge, for both IOS and Android.

[![npm](https://img.shields.io/npm/v/react-native-rn-cirrus-md-sdk-library?color=green)](https://www.npmjs.com/package/react-native-rn-cirrus-md-sdk-library)

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
#### IOS
For IOS you will need to add [CirrusMD SDK](https://github.com/CirrusMD/CirrusMD-iOS-SDK-Example) in your project in order to work.
#### Adding CirrusMD SDK
Install Cocoapods:
```gem install cocapods```

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

Run `yarn` to install all dependencies and `yarn example ios` to start the app.

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


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
