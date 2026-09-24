package com.ds.nativemodule

import android.os.Build
import android.view.HapticFeedbackConstants
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = NativeHapticsModule.NAME)
class NativeHapticsModule(reactContext: ReactApplicationContext) :
  NativeHapticsSpec(reactContext) {

  override fun getName(): String = NAME

  override fun trigger(kind: String) {
    val view = reactApplicationContext.currentActivity?.window?.decorView ?: return
    val constant = when (kind) {
      "selection" -> HapticFeedbackConstants.CLOCK_TICK
      "impact" -> HapticFeedbackConstants.KEYBOARD_TAP
      "error" ->
        if (Build.VERSION.SDK_INT >= 30) {
          HapticFeedbackConstants.REJECT
        } else {
          HapticFeedbackConstants.LONG_PRESS
        }
      else ->
        if (Build.VERSION.SDK_INT >= 30) {
          HapticFeedbackConstants.CONFIRM
        } else {
          HapticFeedbackConstants.KEYBOARD_TAP
        }
    }
    view.post {
      view.performHapticFeedback(constant, HapticFeedbackConstants.FLAG_IGNORE_VIEW_SETTING)
    }
  }

  companion object {
    const val NAME = "NativeHaptics"
  }
}
