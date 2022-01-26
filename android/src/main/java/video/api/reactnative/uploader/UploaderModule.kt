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

  init {
    videosApi.apiClient.setApplicationName("reactnative-uploader")
  }

  override fun getName(): String {
    return "ApiVideoUploader"
  }

  @ReactMethod
  fun setApiKey(apiKey: String?) {
    val chunkSize = videosApi.apiClient.uploadChunkSize
    videosApi = if (apiKey == null) {
      VideosApi(videosApi.apiClient.basePath)
    } else {
      VideosApi(apiKey, videosApi.apiClient.basePath)
    }
    videosApi.apiClient.uploadChunkSize = chunkSize
  }

  @ReactMethod
  fun setEnvironment(environment: String) {
    videosApi.apiClient.basePath = environment
  }

  @ReactMethod
  fun setChunkSize(size: Int, promise: Promise) {
    try {
      videosApi.apiClient.uploadChunkSize = size.toLong()
      promise.resolve(videosApi.apiClient.uploadChunkSize)
    } catch (e: Exception) {
      promise.reject("failed_to_set_chunk_size", "Failed to set chunk size", e)
    }
  }

  @ReactMethod
  fun uploadWithUploadToken(token: String, filePath: String, promise: Promise) {
    try {
      promise.resolve(json.serialize(videosApi.uploadWithUploadToken(token, File(filePath))))
    } catch (e: Exception) {
      promise.reject("upload_with_upload_token_failed", "Upload with upload token failed", e)
    }
  }

  @ReactMethod
  fun upload(videoId: String, filePath: String, promise: Promise) {
    try {
      promise.resolve(json.serialize(videosApi.upload(videoId, File(filePath))))
    } catch (e: Exception) {
      promise.reject("upload_failed", "Upload failed", e)
    }
  }
}
