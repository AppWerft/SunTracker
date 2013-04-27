exports.getEvents = function(latlon) {

	var SunriseSunset = function(utcFullYear, utcMonth, utcDay, latlon) {
		this.zenith = 90 + 50 / 60;
		this.utcFullYear = utcFullYear;
		this.utcMonth = utcMonth;
		this.utcDay = utcDay;
		this.latitude = latlon.split(',')[0],
		this.longitude = latlon.split(',')[1],
		this.rising = true;
		this.lngHour = this.longitude / 15;
	};
  
    SunriseSunset.prototype = {
        sin: function( deg ) { return Math.sin( deg * Math.PI / 180 ); },
        cos: function( deg ) { return Math.cos( deg * Math.PI / 180 ); },
        tan: function( deg ) { return Math.tan( deg * Math.PI / 180 ); },
        asin: function( x ) { return (180/Math.PI) * Math.asin(x); },
        acos: function( x ) { return (180/Math.PI) * Math.acos(x); },
        atan: function( x ) { return (180/Math.PI) * Math.atan(x); },
        getDOY: function() {
            var month = this.utcMonth,
                year = this.utcFullYear,
                day = this.utcDay;
            var N1 = Math.floor( 275 * month / 9 ),
            	N2 = Math.floor( (month + 9) / 12 ),
            	N3 = (1 + Math.floor((year - 4 * Math.floor(year / 4 ) + 2) / 3));
            return	N1 - (N2 * N3) + day - 30;
        },
        approximateTime: function() {
            var doy = this.getDOY();
            if ( this.rising ) {
                return doy + ((6 - this.lngHour) / 24);
            } else {
                return doy + ((18 - this.lngHour) / 24);
            }
        },
        meanAnomaly: function() {
            var t = this.approximateTime();
            return (0.9856 * t) - 3.289;
        },
        trueLongitude: function() {
            var M = this.meanAnomaly();
            var L = M + (1.916 * this.sin(M)) + (0.020 * this.sin(2 * M)) + 282.634;
            return L % 360;
        },
        rightAscension: function() {
            var L = this.trueLongitude();
            var RA = this.atan(0.91764 * this.tan(L));
            RA %= 360;
            var Lquadrant  = (Math.floor( L/90)) * 90;
            var RAquadrant = (Math.floor(RA/90)) * 90;
            RA = RA + (Lquadrant - RAquadrant);
            RA /= 15;
            return RA;
        },
        sinDec: function() {
            var L = this.trueLongitude();
            return 0.39782 * this.sin(L);
        },
        cosDec: function() {
            return this.cos(this.asin(this.sinDec()));
        },
     
        localMeanTime: function() {
            var cosH = (this.cos(this.zenith) - (this.sinDec() * this.sin(this.latitude)))/(this.cosDec() * this.cos(this.latitude));
            if (cosH >  1 || cosH < -1) {
                return null;
            } else {
                var H = this.rising ? 360 - this.acos(cosH) : this.acos(cosH);
                H /= 15;
                var RA = this.rightAscension();
                var t = this.approximateTime();
                var T = H + RA - (0.06571 * t) - 6.622;
                return T;
            }
        },
     
        hoursRange: function( h ) {
            return (h+24) % 24;
        },
     
        UTCTime: function() {
            var T = this.localMeanTime();
            var UT = T - this.lngHour;
            return this.hoursRange( UT );
            //if ( UT < 0 ) UT += 24;
            //return UT % 24;
        },
     
        sunriseUtcHours: function() {
            this.rising = true;
            return this.UTCTime();
        },
     
        sunsetUtcHours: function() {
            this.rising = false;
            return this.UTCTime();
        },
     
        sunriseLocalHours: function(gmt) {
            return this.hoursRange( gmt + this.sunriseUtcHours() );
        },
     
        sunsetLocalHours: function(gmt) {
            return this.hoursRange( gmt + this.sunsetUtcHours() );
        },
     
        isDaylight: function( utcCurrentHours ) {
            var sunriseHours = this.sunriseUtcHours(), sunsetHours = this.sunsetUtcHours();
            if ( sunsetHours < sunriseHours ) {
                // Either the sunrise or sunset time is for tomorrow
                if ( utcCurrentHours > sunriseHours ) {
                    return true;
                } else if ( utcCurrentHours < sunsetHours ) {
                    return true;
                } else {
                    return false;
                }
            }
     
            if ( utcCurrentHours >= sunriseHours ) {
                return utcCurrentHours < sunsetHours;
            }
            return false;
        }
    };
	var utc = require('moment').utc();
	var self = new SunriseSunset(utc.year(), utc.month() + 1, utc.date(), latlon);
	var hours = utc.hours() + utc.minutes()/60;
	
	var rising = self.sunriseUtcHours() - hours;
	var setting = self.sunsetUtcHours() - hours;
	
	return ({
		rising : (rising + 24)%24,
		setting : (setting+24)%24
	});
}