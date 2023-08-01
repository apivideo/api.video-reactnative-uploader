package video.api.reactnative.uploader

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule
import video.api.uploader.VideosApi
import video.api.uploader.api.JSON
import java.io.File

class UploaderModule(reactContext: ReactApplicationContext): UploaderModuleSpec(reactContext) {
  private var videosApi = VideosApi()
  private val json = JSON()

  init {
    videosApi.apiClient.setSdkName("reactnative-uploader", "1.1.0")
  }

  override fun getName() = NAME

  @ReactMethod
  override fun setApplicationName(name: String, version: String) {
    videosApi.apiClient.setApplicationName(name, version)
  }

  @ReactMethod
  override fun setApiKey(apiKey: String?) {
    val chunkSize = videosApi.apiClient.uploadChunkSize
    videosApi = if (apiKey == null) {
      VideosApi(videosApi.apiClient.basePath)
    } else {
      VideosApi(apiKey, videosApi.apiClient.basePath)
    }
    videosApi.apiClient.uploadChunkSize = chunkSize
  }

  @ReactMethod
  override fun setEnvironment(environment: String) {
    videosApi.apiClient.basePath = environment
  }

  @ReactMethod
  override fun setChunkSize(size: Double, promise: Promise) {
    try {
      videosApi.apiClient.uploadChunkSize = size.toLong()
      promise.resolve(videosApi.apiClient.uploadChunkSize.toInt())
    } catch (e: Exception) {
      promise.reject("failed_to_set_chunk_size", "Failed to set chunk size", e)
    }
  }

  @ReactMethod
  override fun uploadWithUploadToken(token: String, filePath: String, promise: Promise) {
    try {
      val video = videosApi.uploadWithUploadToken(token, File(filePath))
      promise.resolve(json.serialize(video))
    } catch (e: Exception) {
      promise.reject("upload_with_upload_token_failed", "Upload with upload token failed", e)
    }
  }

  @ReactMethod
  override fun upload(videoId: String, filePath: String, promise: Promise) {
    try {
      val video = videosApi.upload(videoId, File(filePath))
      promise.resolve(json.serialize(video))
    } catch (e: Exception) {
      promise.reject("upload_failed", "Upload failed", e)
    }
  }

  companion object {
    const val NAME = "ApiVideoUploader"
  }
}
