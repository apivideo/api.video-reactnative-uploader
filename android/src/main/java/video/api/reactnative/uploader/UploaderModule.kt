package video.api.reactnative.uploader

import androidx.appcompat.app.AppCompatActivity
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import java.util.concurrent.CancellationException


class UploaderModule(reactContext: ReactApplicationContext) :
  UploaderModuleSpec(reactContext) {
  private val uploaderModuleImpl = UploaderModuleImpl(
    reactContext,
    UploaderLiveDataHost(reactContext.currentActivity as AppCompatActivity),
    PermissionManager(reactContext)
  )

  init {
    uploaderModuleImpl.setSdkName(SDK_NAME, SDK_VERSION)
  }

  override fun getName() = NAME

  @ReactMethod
  override fun setApplicationName(name: String, version: String) {
    uploaderModuleImpl.setApplicationName(name, version)
  }

  @ReactMethod
  override fun setApiKey(apiKey: String?) {
    uploaderModuleImpl.apiKey = apiKey
  }

  @ReactMethod
  override fun setEnvironment(environment: String) {
    uploaderModuleImpl.environment = environment
  }

  @ReactMethod
  override fun setChunkSize(size: Double, promise: Promise) {
    try {
      uploaderModuleImpl.chunkSize = size.toLong()
      promise.resolve(uploaderModuleImpl.chunkSize.toInt())
    } catch (e: Exception) {
      promise.reject("failed_to_set_chunk_size", "Failed to set chunk size", e)
    }
  }

  @ReactMethod
  override fun setTimeout(timeout: Double) {
    uploaderModuleImpl.timeout = timeout
  }

  @ReactMethod
  override fun uploadWithUploadToken(
    token: String,
    filePath: String,
    videoId: String?,
    promise: Promise
  ) {
    try {
      uploaderModuleImpl.uploadWithUploadToken(token, filePath, videoId, { _ ->
      }, { video ->
        promise.resolve(video)
      }, {
        promise.reject(CancellationException("Upload was cancelled"))
      }, { e ->
        promise.reject(e)
      })
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  @ReactMethod
  override fun upload(videoId: String, filePath: String, promise: Promise) {
    try {
      uploaderModuleImpl.upload(videoId, filePath, { _ ->
      }, { video ->
        promise.resolve(video)
      }, {
        promise.reject(CancellationException("Upload was cancelled"))
      }, { e ->
        promise.reject(e)
      })
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  companion object {
    const val NAME = "ApiVideoUploader"

    const val SDK_NAME = "reactnative-uploader"
    const val SDK_VERSION = "1.1.0"
  }
}
