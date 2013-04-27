exports.create = function(cameras, i) {
	var camera = cameras[i];
	var self = Ti.UI.createTableViewRow({
		height : 60,
		camera : camera,
		hasChild : true
	});
	self.container = Ti.UI.createView({
		left : 90,
		height : Ti.UI.FILL,
		layout : 'vertical'
	});
	self.image = Ti.UI.createImageView({
		top : 0,
		left : 0,
		defaultImage : '',
		width : 80,
		height : 60,
		borderRadius : 8
	});
	var prev = require('camerapreview');
	prev.get('http://' + camera.url + '/axis-cgi/jpg/image.cgi', function(_data) {
		if (_data.status)
			self.image.setImage(_data.image);
		else {

			self.remove(self.container);
			self.remove(self.timestamp);
			self.setHeight(0);
			self.hide();
			/*
			 Ti.App.fireEvent('app:deleterow', {
			 ndx : i
			 });
			 */
		}
	});
	self.add(self.image);
	self.add(self.container);
	self.container.add(Ti.UI.createLabel({
		text : camera.title,
		width : Ti.UI.FILL,
		top : 5,
		height : 23,
		left : 0,
		font : {
			fontWeight : 'bold',
			fontSize : 20
		}
	}));
	self.container.add(Ti.UI.createLabel({
		text : camera.subtitle,
		width : 140,
		top : 5,
		left : 0,
		height : 20,
		font : {
			fontWeight : 'bold',
			fontSize : 14
		}
	}));
	self.timestamp = Ti.UI.createLabel({
		text : camera.event,
		width : Ti.UI.FILL,
		bottom : 0,
		height : 33,
		textAlign : 'right',
		right : 10,
		color : '#bbb',
		font : {
			fontWeight : 'bold',
			fontSize : 30
		}
	});
	self.add(self.timestamp);
	return self;
};
