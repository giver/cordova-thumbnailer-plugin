/**
 * Cordova Android image thumbnailer plugin
 * @author Tanin Srivaraphong <tanin.s@outlook.com>
 * @version 0.1
 */

cordova.define("cordova/plugin/thumbnailer", function(require, exports, module) {
	var exec = require('cordova/exec');

	var Thumbnailer = function() {};

	MyPlugin.prototype.foo = function(successCallback,failureCallback) {
	    exec(successCallback, failureCallback, 'MyPlugin', 'foo', []);
	}

	MyPlugin.prototype.bar = function(successCallback,failureCallback) {
	    exec(successCallback, failureCallback, 'MyPlugin', 'bar', []);
	}

	MyPlugin.prototype.baz = function(successCallback,failureCallback) {
	    exec(successCallback, failureCallback, 'MyPlugin', 'baz', []);
	}

	var myplugin = new MyPlugin();
	module.exports = myplugin;
});

/**
 * Constructor
 */
function Thumbnailer() {
};

/**
 * Starts the video player intent
 *
 * @param url           The url to play
 */
Thumbnailer.prototype.createVideoThumbnail = function ( url, callback ) {
    if ( url.toLowerCase().indexOf( "file://" ) === 0 ) {
        url = url.substring( 7 );
    }
    cordova.exec( callback, thumbError, "Thumbnailer", "createVideoThumbnail", [url] );
};
Thumbnailer.prototype.createImageThumbnail = function ( url, callback ) {
    if ( url.toLowerCase().indexOf( "file://" ) === 0 ) {
        url = url.substring( 7 );
    }
    cordova.exec( callback, thumbError, "Thumbnailer", "createImageThumbnail", [url] );
};

function thumbError( err ) {
    alert( 'Error creating thumbnail!' );
};

/**
 * Load Thumbnailer
 */

if ( !window.plugins ) {
    window.plugins = {};
}
if ( !window.plugins.thumbnailer ) {
    window.plugins.thumbnailer = new Thumbnailer();
}
