exports.get = function(_url, _callback) {
    var xhr = Ti.Network.createHTTPClient({
        timeout : 80000,
        enableKeepAlive : true,
        onload : function() {
            console.log('status: ' + this.status);
        },
        onerror : function() {
            console.log('error: ' + this.error);
        },
        onreadystatechange : function() {
            console.log('readyState: ' + this.readyState);
            console.log(this.responseData);
        }
    });
    xhr.open('GET', _url);
    xhr.send();
};