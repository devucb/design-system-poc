package com.ds.nativemodule

import android.content.pm.PackageManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = NativeAppEnvModule.NAME)
class NativeAppEnvModule(reactContext: ReactApplicationContext) :
  NativeAppEnvSpec(reactContext) {

  override fun getName(): String = NAME

  override fun getAppEnv(): String {
    val context = reactApplicationContext
    val value = runCatching {
      context.packageManager
        .getApplicationInfo(context.packageName, PackageManager.GET_META_DATA)
        .metaData
        ?.getString(META_DATA_KEY)
    }.getOrNull()
    return if (value.isNullOrEmpty()) DEFAULT else value
  }

  companion object {
    const val NAME = "NativeAppEnv"

    /** Product flavor writes this through `manifestPlaceholders`. */
    private const val META_DATA_KEY = "APP_ENV"
    private const val DEFAULT = "prod"
  }
}
