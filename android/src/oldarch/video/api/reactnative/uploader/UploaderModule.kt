package video.api.reactnative.uploader

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

abstract class UploaderModuleSpec(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  abstract fun setApplicationName(name: String, version: String)

  abstract fun setApiKey(apiKey: String?)

  abstract fun setEnvironment(environment: String)

  abstract fun setChunkSize(size: Double, promise: Promise)

  abstract fun setTimeout(timeout: Double)

  abstract fun uploadWithUploadToken(token: String, filePath: String, videoId: String?, promise: Promise)

  abstract fun upload(videoId: String, filePath: String, promise: Promise)
}
