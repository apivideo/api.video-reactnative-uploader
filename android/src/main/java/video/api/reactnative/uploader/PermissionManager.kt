package video.api.reactnative.uploader

import android.content.pm.PackageManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.modules.core.PermissionAwareActivity
import com.facebook.react.modules.core.PermissionListener

/**
 * Check if the app has the given permission.
 * Only for a single permission.
 */
class PermissionManager(
  private val reactContext: ReactApplicationContext,
) : PermissionListener {
  private var uniqueRequestCode = 1
  private val activity = reactContext.currentActivity!!
  private val permissionAwareActivity = activity as PermissionAwareActivity

  private val listeners = mutableMapOf<Int, IListener>()
  private fun hasPermission(permission: String) =
    reactContext.checkSelfPermission(permission) == PackageManager.PERMISSION_GRANTED

  fun requestPermission(
    permission: String,
    onGranted: () -> Unit,
    onShowPermissionRationale: (() -> Unit) -> Unit,
    onDenied: () -> Unit
  ) {
    requestPermission(permission, object : IListener {
      override fun onGranted() {
        onGranted()
      }

      override fun onShowPermissionRationale(onRequiredPermissionLastTime: () -> Unit) {
        onShowPermissionRationale(onRequiredPermissionLastTime)
      }

      override fun onDenied() {
        onDenied()
      }
    })
  }

  private fun requestPermission(permission: String, listener: IListener) {
    val currentRequestCode = synchronized(this) {
      uniqueRequestCode++
    }
    listeners[currentRequestCode] = listener
    when {
      hasPermission(permission) -> listener.onGranted()
      activity.shouldShowRequestPermissionRationale(permission) -> {
        listener.onShowPermissionRationale {
          permissionAwareActivity.requestPermissions(
            arrayOf(permission),
            currentRequestCode,
            this
          )
        }
      }

      else -> permissionAwareActivity.requestPermissions(
        arrayOf(permission),
        currentRequestCode,
        this
      )
    }
  }

  override fun onRequestPermissionsResult(
    requestCode: Int,
    permissions: Array<String>,
    grantResults: IntArray
  ): Boolean {
    val listener = listeners[requestCode] ?: return false
    listeners.remove(requestCode)

    if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
      listener.onGranted()
    } else {
      listener.onDenied()
    }

    return listeners.isEmpty()
  }

  interface IListener {
    fun onGranted()
    fun onShowPermissionRationale(onRequiredPermissionLastTime: () -> Unit)
    fun onDenied()
  }
}
