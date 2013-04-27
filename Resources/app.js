// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.UI.setBackgroundColor('#000');
Ti.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK;
var modus = (Ti.UI.orientation == Titanium.UI.PORTRAIT ) ? 'setting' : 'rising';
var galwin;
function cron() {
	require('model').getListe(modus, function(cameras) {
		galwin = require('gallery').create(cameras);
		var rows = [];
		for (var i = 0; i < cameras.length && i < 400; i++) {
			var row = require('camerarow').create(cameras, i);
			rows.push(row);
		}
		startwindow.tv.setData(rows);
		Ti.App.addEventListener('app:deleterow', function(_e) {
			startwindow.tv.deleteRow(_e.ndx);
		})
	});
}

// create base UI tab and root window
//
var startwindow = Titanium.UI.createWindow({

});

startwindow.open();

var top = Ti.UI.createImageView({
	height : 60,
	top : 0,
	width : Ti.UI.FILL,
	image : '/assets/sun.png'
});

var toptext = Ti.UI.createLabel({
	text : (Titanium.UI.orientation === Titanium.UI.PORTRAIT ) ? 'Sunset' : 'Sunrise',
	height : 50,
	left : 10,
	bottom : 0,
	color : 'white',
	shadowOffset : {
		x : 1,
		y : 1
	},
	shadowColor : 'black',
	font : {
		fontWeight : 'bold',
		fontSize : 25
	},
	opacity : 0.6
});
top.add(toptext);

startwindow.add(top);
startwindow.tv = Ti.UI.createTableView({
	top : 60
});

startwindow.add(startwindow.tv);
cron();
setInterval(cron, 60000);

var busy = false;
Ti.Gesture.addEventListener('orientationchange', function(e) {
	if (e.orientation > 2)
		return;
	switch (e.orientation) {
		case 1 :
			modus = 'setting';
			toptext.text = 'Sunset';
			break
		case 2 :
			modus = 'rising';
			toptext.text = 'Sunrise';
			break;

	}
	if (busy === false) {
		busy = true;
		cron();
		setTimeout(function() {
			busy = false;
			cron();
		}, 700);
	}
});

startwindow.tv.addEventListener('click', function(_e) {
	galwin.open({
		transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
	});
	var html = '<html><body style="padding:0px;margin:0px;"><img width="480" height="320" src="' + 'http://' + _e.rowData.camera.url + '/axis-cgi/mjpg/video.cgi' + '"></body></html>';
	galwin.motionJPEGView.setHtml(html);
	galwin.map.setLocation({
		latitude : _e.rowData.camera.latlon.split(',')[0],
		longitude : _e.rowData.camera.latlon.split(',')[1],
		animate : true,
		latitudeDelta : 0.04,
		longitudeDelta : 0.04
	});
	galwin.motionJPEGView.reload();

});
