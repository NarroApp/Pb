
var Info        = require('./components/info'),
    Entry       = require('./components/entry'),
    request     = require('./utils/request')
    ;

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

    request(parser + encodeURIComponent(this.feed), function(err, resp) {
        if (resp) {
            resp = JSON.parse(resp);
        }
        if (err) {
            this.node.textContent = 'Error loading embedded podcast:\n';
            this.node.textContent += err;
            this.node.className += 'pb-embed-error';
        } else if (!resp || !resp.data) {
            console.error('No data returned for embedded podcast');
        } else {
            this.data = resp.data[0];
            this.render();
        }
    }.bind(this));
};

PB.prototype.render = function render() {
    var entry;

    this.components.info = new Info(this.data);
    this.node.appendChild(this.components.info.node);
    for (var i = 0; i < this.data.entries.length; i++) {
        entry = new Entry(this.data.entries[i]);
        this.components.entries.push(entry);
        this.node.appendChild(entry.node);
    }
};
