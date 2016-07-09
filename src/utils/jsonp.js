
module.exports = function jsonp(url, cb) {
    window.pbCallbacks = window.pbCallbacks || {cntr: 0};
    asyncRequest(url, url, function(id, data) {
        cb(data);
    });

    function asyncRequest (url, id, fn) {
        var name = "fn" + window.pbCallbacks.cntr++;

        window.pbCallbacks[name] = function() {
            delete window.pbCallbacks[name];
            var args = [id, arguments[0]];
            fn.apply(this, args);
        };
        doJSONP(url, "pbCallbacks." + name);
    }

    function doJSONP(url, callbackFuncName, cbName) {
        var fullUrl = url + "&" + (cbName || "callback") + "=" + callbackFuncName,
            script = document.createElement('script');

        script.src = fullUrl;
        document.body.appendChild(script);
    }
};
