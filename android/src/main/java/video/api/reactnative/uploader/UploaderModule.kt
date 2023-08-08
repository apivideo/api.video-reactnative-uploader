package video.api.reactnative.uploader

import android.os.Handler
import android.os.Looper
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.work.WorkManager
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import video.api.uploader.VideosApi
import video.api.uploader.api.work.stores.VideosApiStore
import video.api.uploader.api.work.upload
import video.api.uploader.api.work.uploadWithUploadToken
import video.api.uploader.api.work.workers.AbstractUploadWorker
import java.io.File


class UploaderModule(private val reactContext: ReactApplicationContext) :
  UploaderModuleSpec(reactContext) {
  private var videosApi = VideosApi()
  private val handler = Handler(Looper.getMainLooper())

  private val workManager = WorkManager.getInstance(reactContext)

  init {
    initializeVideosApi()
  }

  override fun getName() = NAME

  private fun initializeVideosApi() {
    videosApi.apiClient.setSdkName(SDK_NAME, SDK_VERSION)
    VideosApiStore.initialize(videosApi)
  }

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

    initializeVideosApi()
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
    if (!reactContext.hasPermission(Utils.readPermission)) {
      promise.reject("missing_permission", "Missing permission ${Utils.readPermission}")
      return
    }
    try {
      val operationWithRequest = workManager.uploadWithUploadToken(token, File(filePath))
      val workInfoLiveData = workManager.getWorkInfoByIdLiveData(operationWithRequest.request.id)
      handler.post {
        workInfoLiveData.observeTillItFinishes(
          (reactContext.currentActivity as AppCompatActivity),
          onUploadEnqueued = {
            Log.d(TAG, "Upload with upload token enqueued")
          },
          onUploadRunning = {},
          onUploadSucceeded = { data ->
            promise.resolve(data.getString(AbstractUploadWorker.VIDEO_KEY)!!)
          },
          onUploadFailed = { data ->
            promise.reject(
              "upload_with_upload_token_failed",
              data.getString(AbstractUploadWorker.ERROR_KEY)
                ?: reactContext.getString(R.string.unknown_error)
            )
          },
          onUploadBlocked = {},
          onUploadCancelled = {
            promise.reject(
              "upload_with_upload_token_cancelled",
              reactContext.getString(R.string.upload_with_upload_token_cancelled)
            )
          },
          removeObserverAfterNull = false
        )
      }
    } catch (e: Exception) {
      promise.reject(
        "upload_with_upload_token_failed",
        reactContext.getString(R.string.upload_with_upload_token_failed),
        e
      )
    }
  }

  @ReactMethod
  override fun upload(videoId: String, filePath: String, promise: Promise) {
    if (!reactContext.hasPermission(Utils.readPermission)) {
      promise.reject("missing_permission", "Missing permission ${Utils.readPermission}")
      return
    }
    try {
      val operationWithRequest = workManager.upload(videoId, File(filePath))
      val workInfoLiveData = workManager.getWorkInfoByIdLiveData(operationWithRequest.request.id)
      handler.post {
        workInfoLiveData.observeTillItFinishes(
          (reactContext.currentActivity as AppCompatActivity),
          onUploadEnqueued = {
            Log.d(TAG, "Upload enqueued")
          },
          onUploadRunning = {},
          onUploadSucceeded = { data ->
            promise.resolve(data.getString(AbstractUploadWorker.VIDEO_KEY)!!)
          },
          onUploadFailed = { data ->
            promise.reject(
              "upload_failed", data.getString(AbstractUploadWorker.ERROR_KEY)
                ?: reactContext.getString(R.string.unknown_error)
            )
          },
          onUploadBlocked = {},
          onUploadCancelled = {
            promise.reject(
              "upload_cancelled",
              reactContext.getString(R.string.upload_cancel)
            )
          },
          removeObserverAfterNull = false
        )
      }
    } catch (e: Exception) {
      promise.reject("upload_failed", reactContext.getString(R.string.upload_failed), e)
    }
  }

  companion object {
    const val NAME = "ApiVideoUploader"
    const val TAG = "UploadModule"

    const val SDK_NAME = "reactnative-uploader"
    const val SDK_VERSION = "1.1.0"
  }
}
