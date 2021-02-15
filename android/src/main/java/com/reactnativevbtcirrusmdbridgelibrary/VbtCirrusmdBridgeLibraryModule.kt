package com.reactnativevbtcirrusmdbridgelibrary

import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class VbtCirrusmdBridgeLibraryModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "VbtCirrusmdBridgeLibrary"
    }

  var context: ReactApplicationContext = reactApplicationContext

  @ReactMethod
  fun loginAndroid(sdkId: String, patientId: String, secret: String){
    val cirrus = CirrusMDSDK.SingletonCirrus.login(sdkId, patientId, secret, context)
  }

  @ReactMethod
  fun loadAndroidView(){
    val intent = CirrusMDSDK.SingletonCirrus.activity
    if (intent != null) {
      intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      reactApplicationContext.startActivity(intent)
    }
  }
}
