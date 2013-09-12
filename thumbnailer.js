/**
 * Cordova Android image thumbnailer plugin
 * @author Tanin Srivaraphong <tanin.s@outlook.com>
 * @version 0.1
 */

cordova.define("cordova/plugin/thumbnailer", function(require, exports, module) {
	var exec = require('cordova/exec');

	var Thumbnailer = function() {};

	Thumbnailer.prototype.createVideoThumbnail = function(srcFilePath, successCallback, failureCallback) {
	    if ( srcFilePath.toLowerCase().indexOf( "file://" ) === 0 ) {
            srcFilePath = srcFilePath.substring( 7 );
        }
	    
	    exec(successCallback, failureCallback, 'Thumbnailer', 'createVideoThumbnail', [srcFilePath]);
	}

	Thumbnailer.prototype.createImageThumbnail = function(srcFilePath, successCallback,failureCallback) {
	    if ( srcFilePath.toLowerCase().indexOf( "file://" ) === 0 ) {
            srcFilePath = srcFilePath.substring( 7 );
        }
	    
	    exec(successCallback, failureCallback, 'Thumbnailer', 'createImageThumbnail', [srcFilePath]);
	}

	module.exports = new Thumbnailer();
});

/**
 * Load Thumbnailer
 */
if ( !window.plugins ) {
    window.plugins = {};
}
if ( !window.plugins.thumbnailer ) {
    window.plugins.thumbnailer = cordova.require("cordova/plugin/thumbnailer");
}
