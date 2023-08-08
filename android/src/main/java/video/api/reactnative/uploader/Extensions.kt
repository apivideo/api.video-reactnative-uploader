package video.api.reactnative.uploader

import android.content.Context
import android.content.pm.PackageManager
import androidx.core.content.ContextCompat
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.LiveData
import androidx.lifecycle.Observer
import androidx.work.Data
import androidx.work.WorkInfo

/**
 * Check if the app has the given permission.
 *
 * @param permission The permission to check.
 * @return `true` if the app has the permission, `false` otherwise.
 */
fun Context.hasPermission(permission: String): Boolean {
  return ContextCompat.checkSelfPermission(this, permission) == PackageManager.PERMISSION_GRANTED
}


fun LiveData<WorkInfo?>.observeTillItFinishes(
  owner: LifecycleOwner,
  onUploadEnqueued: () -> Unit = {},
  onUploadRunning: (Data) -> Unit,
  onUploadSucceeded: (Data) -> Unit,
  onUploadFailed: (Data) -> Unit,
  onUploadBlocked: () -> Unit = {},
  onUploadCancelled: () -> Unit = {},
  removeObserverAfterNull: Boolean = false,
) {
  observe(owner, object : Observer<WorkInfo?> {
    override fun onChanged(value: WorkInfo?) {
      if (value == null) {
        if (removeObserverAfterNull) {
          removeObserver(this)
        }
        return
      }

      if (value.state.isFinished) {
        removeObserver(this)
      }
      when (value.state) {
        WorkInfo.State.ENQUEUED -> onUploadEnqueued()
        WorkInfo.State.RUNNING -> onUploadRunning(value.progress)
        WorkInfo.State.SUCCEEDED -> onUploadSucceeded(value.outputData)
        WorkInfo.State.FAILED -> onUploadFailed(value.outputData)
        WorkInfo.State.BLOCKED -> onUploadBlocked()
        WorkInfo.State.CANCELLED -> onUploadCancelled()
      }
    }
  })
}
