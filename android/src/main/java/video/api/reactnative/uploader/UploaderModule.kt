package video.api.reactnative.uploader

import android.net.Uri
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import okhttp3.OkHttpClient
import org.json.JSONObject
import video.api.videouploader_module.ApiError
import video.api.videouploader_module.CallBack
import video.api.videouploader_module.UploaderRequestExecutorImpl
import video.api.videouploader_module.VideoUploader
import java.io.File
import java.io.IOException
import java.net.URI
import android.database.Cursor

import android.content.Context

import android.provider.MediaStore

import android.provider.DocumentsContract

import android.content.ContentUris

import android.os.Environment

import android.os.Build




class UploaderModule(var reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ApiVideoUploader"
    }

  @ReactMethod
  fun upload(token: String,fileName: String,filePath: String, promise: Promise){
    uploadVideo(token,filePath, object : CallBack{
      override fun onError(apiError: ApiError) {
        promise.resolve(apiError.name)
      }

      override fun onFatal(e: IOException) {
        promise.resolve(e.message)
      }

      override fun onSuccess(result: JSONObject) {
        promise.resolve(result.toString())
      }
    })
  }


    private fun uploadVideo(token: String, filePath: String, callBack: CallBack){
    val client = OkHttpClient()
    val uploader = VideoUploader("https://ws.api.video", UploaderRequestExecutorImpl(client), client)
    val uri = URI(filePath)
    val file = File(uri.path)
    var json: JSONObject? = null
    uploader.uploadWithDelegatedToken(token,file,object : CallBack {
      override fun onError(apiError: ApiError) {
        callBack.onError(apiError)
      }

      override fun onFatal(e: IOException) {
        callBack.onFatal(e)
      }

      override fun onSuccess(result: JSONObject) {
        json = result
        callBack.onSuccess(json!!)
      }
    })
  }

  /**
   * Get a file path from a Uri. This will get the the path for Storage Access
   * Framework Documents, as well as the _data field for the MediaStore and
   * other file-based ContentProviders.
   *
   * @param context The context.
   * @param uri The Uri to query.
   * @author paulburke
   */
  fun getPath(context: Context, uri: Uri): String? {
    val isKitKat = Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT

    // DocumentProvider
    if (isKitKat && DocumentsContract.isDocumentUri(context, uri)) {
      // ExternalStorageProvider
      if (isExternalStorageDocument(uri)) {
        val docId = DocumentsContract.getDocumentId(uri)
        val split = docId.split(":").toTypedArray()
        val type = split[0]
        if ("primary".equals(type, ignoreCase = true)) {
          return Environment.getExternalStorageDirectory().toString() + "/" + split[1]
        }

        // TODO handle non-primary volumes
      } else if (isDownloadsDocument(uri)) {
        val id = DocumentsContract.getDocumentId(uri)
        val contentUri = ContentUris.withAppendedId(
          Uri.parse("content://downloads/public_downloads"), java.lang.Long.valueOf(id)
        )
        return getDataColumn(context, contentUri, null, null)
      } else if (isMediaDocument(uri)) {
        val docId = DocumentsContract.getDocumentId(uri)
        val split = docId.split(":").toTypedArray()
        val type = split[0]
        var contentUri: Uri? = null
        if ("image" == type) {
          contentUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI
        } else if ("video" == type) {
          contentUri = MediaStore.Video.Media.EXTERNAL_CONTENT_URI
        } else if ("audio" == type) {
          contentUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI
        }
        val selection = "_id=?"
        val selectionArgs = arrayOf(
          split[1]
        )
        return getDataColumn(context, contentUri, selection, selectionArgs)
      }
    } else if ("content".equals(uri.scheme, ignoreCase = true)) {
      return getDataColumn(context, uri, null, null)
    } else if ("file".equals(uri.scheme, ignoreCase = true)) {
      return uri.path
    }
    return null
  }

  /**
   * Get the value of the data column for this Uri. This is useful for
   * MediaStore Uris, and other file-based ContentProviders.
   *
   * @param context The context.
   * @param uri The Uri to query.
   * @param selection (Optional) Filter used in the query.
   * @param selectionArgs (Optional) Selection arguments used in the query.
   * @return The value of the _data column, which is typically a file path.
   */
  fun getDataColumn(
    context: Context, uri: Uri?, selection: String?,
    selectionArgs: Array<String>?
  ): String? {
    var cursor: Cursor? = null
    val column = "_data"
    val projection = arrayOf(
      column
    )
    try {
      cursor = context.contentResolver.query(
        uri!!, projection, selection, selectionArgs,
        null
      )
      if (cursor != null && cursor.moveToFirst()) {
        val column_index = cursor.getColumnIndexOrThrow(column)
        return cursor.getString(column_index)
      }
    } finally {
      cursor?.close()
    }
    return null
  }


  /**
   * @param uri The Uri to check.
   * @return Whether the Uri authority is ExternalStorageProvider.
   */
  fun isExternalStorageDocument(uri: Uri): Boolean {
    return "com.android.externalstorage.documents" == uri.authority
  }

  /**
   * @param uri The Uri to check.
   * @return Whether the Uri authority is DownloadsProvider.
   */
  fun isDownloadsDocument(uri: Uri): Boolean {
    return "com.android.providers.downloads.documents" == uri.authority
  }

  /**
   * @param uri The Uri to check.
   * @return Whether the Uri authority is MediaProvider.
   */
  fun isMediaDocument(uri: Uri): Boolean {
    return "com.android.providers.media.documents" == uri.authority
  }
}
