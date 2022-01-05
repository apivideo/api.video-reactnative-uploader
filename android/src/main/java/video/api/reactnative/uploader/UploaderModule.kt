package video.api.reactnative.uploader

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import video.api.uploader.VideosApi
import video.api.uploader.api.JSON
import java.io.File

class UploaderModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  private var videosApi = VideosApi()
  private val json = JSON()

  override fun getName(): String {
    return "ApiVideoUploader"
  }

  @ReactMethod
  fun uploadWithUploadToken(token: String, filePath: String, promise: Promise) {
    try {
      promise.resolve(json.serialize(videosApi.uploadWithUploadToken(token, File(filePath))))
    } catch (e: Exception) {
      promise.reject(e)
    }
  }
}
