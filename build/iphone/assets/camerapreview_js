var latest = true;
exports.get = function(_url, _callback) {
	var cachepath = 'cache2';
	var g = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, cachepath);
	if (!g.exists()) {
		g.createDirectory();
	};
	var filename = Ti.Utils.md5HexDigest(_url) + '.png';
	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, cachepath, filename);
	if (file.exists) {
		_callback({
			status : 'cache',
			image : file.nativePath
		});
	}
	var xhr = Ti.Network.createHTTPClient({
		timeout : 8000,
		onload : function() {
			if (xhr.status == 200) {
				file.write(xhr.responseData);
				file.remoteBackup = false;
				_callback({
					status : 'remote',
					image : file.nativePath
				});
			}
		},
		onerror : function() {
			_callback({
				status : null
			})
		}
	});
	xhr.open('GET', _url);
	xhr.send();

};
