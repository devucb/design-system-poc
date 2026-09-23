package com.ds.nativemodule

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class DSNativePackage : BaseReactPackage() {
  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? =
    when (name) {
      NativeHapticsModule.NAME -> NativeHapticsModule(reactContext)
      NativeAppEnvModule.NAME -> NativeAppEnvModule(reactContext)
      else -> null
    }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider =
    ReactModuleInfoProvider {
      mapOf(
        NativeHapticsModule.NAME to
          ReactModuleInfo(
            NativeHapticsModule.NAME,
            NativeHapticsModule.NAME,
            false,
            false,
            false,
            true,
          ),
        NativeAppEnvModule.NAME to
          ReactModuleInfo(
            NativeAppEnvModule.NAME,
            NativeAppEnvModule.NAME,
            false,
            false,
            false,
            true,
          ),
      )
    }
}
