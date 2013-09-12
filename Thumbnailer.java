package org.apache.cordova.plugin;

import android.util.Log;
import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.media.ThumbnailUtils;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.provider.MediaStore.Video.Thumbnails;
import java.io.FileOutputStream;

/**
 * This class echoes a string called from JavaScript.
 */
public class Thumbnailer extends CordovaPlugin {

    private static final String LOG_TAG = "Thumbnailer";

    private void writeThumbnail(Bitmap srcBitmap, String srcPath, String dstPath, CallbackContext callbackContext) {
        if (srcPath != null && srcPath.length() > 0) {
            try {
                FileOutputStream out = new FileOutputStream(dstPath);
                srcBitmap.compress(Bitmap.CompressFormat.JPEG, 55, out);
                callbackContext.success(dstPath);
            } catch (Exception e) {
                e.printStackTrace();
                callbackContext.error("Cannot create thumbnail file to path = " + dstPath);
            }
        } else {
            callbackContext.error("Invalid destination file path = " + srcPath);
        }
    }

    private void writeThumbnail(Bitmap srcBitmap, String srcPath, CallbackContext callbackContext) {
        String dstPath;

        if (!srcPath.matches(".*\\.jpg$")) {
            dstPath = srcPath + ".jpg";
        } else {
            dstPath = srcPath;
        }

        Log.d(LOG_TAG, "From : " + dstPath);
        dstPath = dstPath.replaceAll("\\.jpg$", ".thumb.jpg");
        Log.d(LOG_TAG, "To : " + dstPath);

        writeThumbnail(srcBitmap, srcPath, dstPath, callbackContext);
    }

    /**
     * Executes the request and returns PluginResult.
     *
     * @param action        The action to execute.
     * @param args          Arguments for the plugin.
     * @param callbackContext    The callback id used when calling back into JavaScript.
     * @return              A PluginResult object with a status and message.
     */
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
        try {
            if (action.equals("createVideoThumbnail")) {
                String srcPath = args.getString(0);

                // MINI_KIND: 512 x 384 thumbnail
                Bitmap bmThumbnail = ThumbnailUtils.createVideoThumbnail(srcPath, Thumbnails.MINI_KIND);
                writeThumbnail(bmThumbnail, srcPath, callbackContext);
                return true;
            } else if (action.equals("createImageThumbnail")) {
                String srcPath = args.getString(0);
                Bitmap bitmap = BitmapFactory.decodeFile(srcPath);
                Bitmap bmThumbnail = ThumbnailUtils.extractThumbnail(bitmap, 160, 120);
                writeThumbnail(bmThumbnail, srcPath, callbackContext);
                return true;
            } else {
                callbackContext.error("Invalid method");
                return false;
            }
        } catch (JSONException e) {
            callbackContext.error("Invalid JSON variable");
        }
        return false;
    }
}
