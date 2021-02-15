package com.reactnativevbtcirrusmdbridgelibrary
import android.content.Intent
import android.util.Log
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.cirrusmd.androidsdk.CirrusEvents
import com.cirrusmd.androidsdk.CirrusListener
import com.cirrusmd.androidsdk.CirrusMD
import com.cirrusmd.androidsdk.CirrusMD.credentialIdListener
import com.cirrusmd.androidsdk.CirrusMD.enableDebugLogging
import com.cirrusmd.androidsdk.CirrusMD.enableSettings
import com.cirrusmd.androidsdk.CirrusMD.listener
import com.cirrusmd.androidsdk.CirrusMD.setSessionToken
import com.cirrusmd.androidsdk.CirrusMD.start
import com.cirrusmd.androidsdk.CredentialIdListener
import com.facebook.react.bridge.ReactApplicationContext
import com.google.gson.GsonBuilder
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import timber.log.Timber


class CirrusMDSDK : AppCompatActivity(), CirrusListener{

  var SDK_ID: String = ""
  var PATIENT_ID: String = ""
  var SECRET : String = ""

  var activity: Intent? = null

  fun login(sdkId: String, patientId: String, secret: String, context: ReactApplicationContext){
    SDK_ID = sdkId
    PATIENT_ID = patientId
    SECRET = secret
    setupCirrus(context)
    fetchTokenForCirrusMDSDK()
  }

  private fun setupCirrus(context: ReactApplicationContext) {
    // For debug logging to be enabled correctly, set CirrusMD.enableDebugLogging = true,
    // before calling CirrusMd.start()
    enableDebugLogging = true

    // Settings view allows the user to view and edit their profile, medical history, dependents, permissions, and Terms of Use / Privacy Policy.
    enableSettings = true

    // Demo Patient does not currently have any dependents
    // enableDependentProfiles = true

    // Obtain Credential Id
    credentialIdListener = object : CredentialIdListener {
      override fun onCredentialIdReady(id: String) {
        Log.d("SHOW","Credential ID: $id")
      }
    }
    if (context != null) {
      start(context, SECRET)
    }
    listener = this
  }

  private fun fetchTokenForCirrusMDSDK() {
    //This retrofit/fetcher/JWT process is unique for each implementation, based on your organization's SSO environment and your app's architecture.
    val retrofit = Retrofit.Builder()
      .addConverterFactory(GsonConverterFactory.create(GsonBuilder().create()))
      .baseUrl(BASE_URL)
      .build()
    val fetcher = retrofit.create<TokenFetcher>(TokenFetcher::class.java)
    val request = TokenRequest(SDK_ID, PATIENT_ID)
    fetcher.getSessionJwt(request)?.enqueue(object : Callback<Token> {
      override fun onResponse(call: Call<Token>, response: Response<Token>) {
        response.body()?.token?.let { token ->
          setSessionToken(token)
        } ?: Log.d("SHOW","No token in response body")
      }

      override fun onFailure(call: Call<Token>, t: Throwable) {
        Log.d("SHOW", "ERROR ON FAILURE")
        Timber.e(t)
      }
    })
  }

  //handle errors
  private fun onEventError(error: String) {
    Log.d("SHOW", error)

    Timber.e(error)
  }

  override fun onEvent(event: CirrusEvents) {
    when (event) {

      CirrusEvents.SUCCESS -> { activity = CirrusMD.intent }
      CirrusEvents.LOGGED_OUT -> onEventError("CirrusMD SDK user was logged out.")
      CirrusEvents.INVALID_JWT -> onEventError("CirrusMD SDK invalid JWT supplied")
      CirrusEvents.INVALID_SECRET -> onEventError("CirrusMD SDK invalid secret supplied")
      CirrusEvents.MISSING_JWT -> onEventError("CirrusMD SDK missing jwt")
      CirrusEvents.MISSING_SECRET -> onEventError("CirrusMD SDK missing secret")
      CirrusEvents.CONNECTION_ERROR -> onEventError("CirrusMD SDK connection error")
      CirrusEvents.AUTHENTICATION_ERROR -> onEventError("CirrusMD SDK auth error")
      CirrusEvents.USER_INTERACTION -> Log.d("SHOW","CirrusMD SDK user interaction")
      CirrusEvents.UNKNOWN_ERROR -> onEventError("CirrusMD SDK generic error") //This error would include cases like network errors
    }
  }

  override fun viewForError(event: CirrusEvents): View? {
    //If you would like to display branded error/logout messages, this is where the CirrusMD SDK will look.
    //Returning null will result in the default views being displayed.
    return null
  }

  companion object {

    val SingletonCirrus = CirrusMDSDK()
    private const val BASE_URL = "https://cmd-demo1-app.cirrusmd.com/sdk/v2/" }
}
