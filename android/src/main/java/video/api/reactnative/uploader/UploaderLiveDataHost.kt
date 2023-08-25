package video.api.reactnative.uploader

import android.os.Handler
import android.os.Looper
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.LiveData
import androidx.work.Data
import androidx.work.WorkInfo
import video.api.reactnative.uploader.utils.observeTillItFinishes

class UploaderLiveDataHost(private val lifecycleOwner: LifecycleOwner) {
  private val handler = Handler(Looper.getMainLooper())

  fun observe(
    liveData: LiveData<WorkInfo?>,
    onUploadEnqueued: () -> Unit = {},
    onUploadRunning: (Data) -> Unit,
    onUploadSucceeded: (Data) -> Unit,
    onUploadFailed: (Data) -> Unit,
    onUploadBlocked: () -> Unit = {},
    onUploadCancelled: () -> Unit = {},
    removeObserverAfterNull: Boolean = false,
  ) {
    handler.post {
      liveData.observeTillItFinishes(
        lifecycleOwner,
        onUploadEnqueued,
        onUploadRunning,
        onUploadSucceeded,
        onUploadFailed,
        onUploadBlocked,
        onUploadCancelled,
        removeObserverAfterNull
      )
    }
  }
}
