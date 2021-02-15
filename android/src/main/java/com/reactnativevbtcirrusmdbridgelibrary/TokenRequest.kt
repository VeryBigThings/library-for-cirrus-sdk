package com.reactnativevbtcirrusmdbridgelibrary
import com.google.gson.annotations.SerializedName

data class TokenRequest(
  @SerializedName("sdk_id") var sdkId: String,
  @SerializedName("patient_id") var patientId: String
)
