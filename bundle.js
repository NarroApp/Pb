(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var create = require('../utils/create');

module.exports = Artwork;

function Artwork(data) {
    this.node = create('img', {
        src: data.itunes.image,
        alt: data.title,
        className: 'pb-embed--info-artwork'
    });
    this.components = {};

    return this;
}

},{"../utils/create":7}],2:[function(require,module,exports){

var create = require('../utils/create'),
    Player = require('./player');

module.exports = Entry;
function Entry(data) {
    this.node = create('div', {
        className: 'pb-embed--entry',
        dataset: {
            guid: data.guid
        }
    });
    this.components = {};

    this.components.player = new Player(data);
    this.components.title = this.node.appendChild(create('h3', {
        className: 'pb-embed--entry-title'
    }));
    this.node.appendChild(this.components.player.node);
    this.components.meta = this.node.appendChild(create('div', {
        className: 'pb-embed--entry-meta'
    }));
    this.components.meta.appendChild(create('span', {
        textContent: new Date(data.pubDate).toLocaleDateString(),
        className: 'pb-embed--entry-date'
    }));
    this.components.description = this.components.meta.appendChild(create('p', {
        innerHTML: data.content,
        className: 'pb-embed--entry-description'
    }));
    this.components.title.appendChild(create('a', {
        textContent: data.title,
        href: data.link,
        target: '_blank',
        className: 'pb-embed--entry-link'
    }));

    return this;
}

},{"../utils/create":7,"./player":4}],3:[function(require,module,exports){

var create = require('../utils/create'),
    Artwork = require('./artwork');

module.exports = Info;

function Info(data) {
    this.node = create('div', {
        className: 'pb-embed--info'
    });
    this.components = {};
    this.components.artwork = new Artwork(data);
    this.node.appendChild(this.components.artwork.node);
    this.components.title = this.node.appendChild(create('h2', {
        textContent: data.title,
        className: 'pb-embed--info-title'
    }));
    this.components.description = this.node.appendChild(create('p', {
        textContent: data.description,
        className: 'pb-embed--info-description'
    }));
    this.components.subscribe = this.node.appendChild(create('a', {
        textContent: 'Subscribe',
        href: data.link,
        target: '_blank',
        className: 'pb-embed--info-subscribe'
    }));

    return this;
}

},{"../utils/create":7,"./artwork":1}],4:[function(require,module,exports){

var create = require('../utils/create');

module.exports = Player;

function Player(data) {
    this.node = create('audio', {
        src: data.enclosure.url,
        className: 'pb-embed--entry-player',
        controls: true
    });
    this.components = {};

    return this;
}

},{"../utils/create":7}],5:[function(require,module,exports){
// main.js
(function (window, document) {
    var PB = require('./pb');

    window.pb = {
        init: pbInit,
        createEmbed: createEmbed
    };
    pbInit();

    function pbInit() {
        var embeds = [],
            selector = '.pb-embed',
            i = 0;

        embeds = document.querySelectorAll(selector);
        for (i = 0; i < embeds.length; i++) {
            createEmbed(embeds[i]);
        }
    }

    function createEmbed(node, feed) {
        feed = feed || node.dataset.feed;
        return new PB(node, feed);
    }
})(window, window.document);

},{"./pb":6}],6:[function(require,module,exports){

var Info = require('./components/info'),
    Entry = require('./components/entry'),
    request = require('./utils/jsonp');

module.exports = PB;
function PB(node, feed) {
    this.node = node;
    this.feed = feed;
    this.data = {};
    this.components = { info: {}, entries: [] };

    this.reload();
    return this;
}

PB.prototype.reload = function reload() {
    var parser = 'https://www.narro.co/api/v1/parser/feed?url=';

    request(parser + encodeURIComponent(this.feed), function (resp) {
        if (!resp || !resp.data) {
            this.node.textContent = 'Error loading embedded podcast';
            this.node.className += 'pb-embed-error';
        } else {
            this.data = resp.data[0];
            this.render();
        }
    }.bind(this));
};

PB.prototype.render = function render() {
    var limit = 0,
        entry;

    limit = parseInt(this.node.dataset.limit, 10) || this.data.entries.length;
    this.node.innerHTML = '';
    this.components.info = new Info(this.data);
    this.node.appendChild(this.components.info.node);
    for (var i = 0; i < limit; i++) {
        entry = new Entry(this.data.entries[i]);
        this.components.entries.push(entry);
        this.node.appendChild(entry.node);
    }
};

},{"./components/entry":2,"./components/info":3,"./utils/jsonp":8}],7:[function(require,module,exports){

module.exports = function create(name, props) {
    var el = document.createElement(name);
    for (var p in props) {
        if (typeof props[p] === 'object') {
            for (var q in props[p]) {
                el[p][q] = props[p][q];
            }
        } else {
            el[p] = props[p];
        }
    }
    return el;
};

},{}],8:[function(require,module,exports){

module.exports = function jsonp(url, cb) {
    window.pbCallbacks = window.pbCallbacks || { cntr: 0 };
    asyncRequest(url, url, function (id, data) {
        cb(data);
    });

    function asyncRequest(url, id, fn) {
        var name = "fn" + window.pbCallbacks.cntr++;

        window.pbCallbacks[name] = function () {
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

},{}]},{},[5]);
