
var Info        = require('./components/info'),
    Entry       = require('./components/entry'),
    request     = require('./utils/jsonp')
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

    request(parser + encodeURIComponent(this.feed), function(resp) {
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
