package video.api.reactnative.uploader

import android.content.Context
import android.content.pm.PackageManager
import androidx.core.content.ContextCompat

/**
 * Check if the app has the given permission.
 *
 * @param permission The permission to check.
 * @return `true` if the app has the permission, `false` otherwise.
 */
fun Context.hasPermission(permission: String): Boolean {
  return ContextCompat.checkSelfPermission(this, permission) == PackageManager.PERMISSION_GRANTED
}
