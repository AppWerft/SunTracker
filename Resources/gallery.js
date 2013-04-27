exports.create = function(cameras) {
	var self = Ti.UI.createWindow({
		backgroundColor : 'black'
	});
	setTimeout(function() {
		self.map = Ti.Map.createView({
			top : 0,
			height : '50%'
		});
		self.motionJPEGView = Ti.UI.createWebView({
			height : '50%',
			bottom : 0
		});
		self.add(self.map);
		self.add(self.motionJPEGView);
		//self.add(self.gal);
			self.motionJPEGView.addEventListener('error', function() {
			self.motionJPEGView.reload();
		})
		Ti.App.addEventListener('resume', function() {
			self.motionJPEGView.reload();
		});
		self.addEventListener('click', function() {

			self.close({
				transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
			});
		});
		self.addEventListener('swipe', function() {
			self.close({
				transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
			});
		});
		self.addEventListener('close', function() {
			self.close();
		})
		/*	Ti.Gesture.addEventListener('orientationchange', function(e) {
		 var url = self.motionJPEGView.url;
		 self.motionJPEGView.url = '';
		 setTimeout(function() {
		 if ( typeof (url) == 'string')
		 self.motionJPEGView.url = url;
		 self.motionJPEGView.reload();
		 }, 2000);
		 switch (e.orientation) {
		 case 1 :
		 Titanium.UI.iPhone.showStatusBar();
		 self.map.height = '45%';
		 self.motionJPEGView.height = '55%';
		 case 2 :
		 break;
		 case 3:
		 case 4:
		 Titanium.UI.iPhone.hideStatusBar();
		 self.map.height = 0;
		 self.motionJPEGView.height = '100%';
		 break;
		 }
		 });*/
	}, 0);
	return self;
}
