exports.getListe = function(modus, _callback) {
	Ti.include('cameras.js');
	for (var i = 0; i < cameras.length; i++) {
		var res = require('suncalculator').getEvents(cameras[i].latlon);
		cameras[i].event = Math.ceil(res[modus] * 60);
	}
	cameras.sort(function(a, b) {
		if (a.event < b.event) {
			return -1;
		}
		if (a.event > b.event) {
			return 1;
		}
		return 0;
	});
	for (var i = 0; i < cameras.length; i++) {
		var c = cameras[i];
		var m =   c.event%60;
		if (m<10) m= '0'+m;
		c.event = Math.floor(c.event/60) + ':' + m;
	}
	_callback(cameras);
}

