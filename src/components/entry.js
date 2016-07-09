
var create      = require('../utils/create'),
    Player      = require('./player');

module.exports = Entry;
function Entry(data) {
    this.node = create('div', {
        className:      'pb-embed--entry',
        dataset:        {
            guid:       data.guid
        }
    });
    this.components = {};

    this.components.player = new Player(data);
    this.components.title = this.node.appendChild(create('h2', {
        className:      'pb-embed--entry-title'
    }));
    this.components.meta = this.node.appendChild(create('div', {
        className:      'pb-embed--entry-meta'
    }));
    this.components.description = this.node.appendChild(create('p', {
        innerHTML:      data.content,
        className:      'pb-embed--entry-description'
    }));
    this.node.appendChild(this.components.player.node);
    this.components.title.appendChild(create('a', {
        textContent:    data.title,
        href:           data.link,
        target:         '_blank',
        className:      'pb-embed--entry-link'
    }));
    this.components.meta.appendChild(create('span', {
        textContent:    (new Date(data.pubDate)).toLocaleDateString(),
        className:      'pb-embed--entry-date'
    }));
    this.components.meta.appendChild(create('span', {
        textContent:    parseInt(data.enclosure.length, 10).toMMSS(),
        className:      'pb-embed--entry-length'
    }));

    return this;
}

Number.prototype.toMMSS = function () {
    var sec_num = this;
    var minutes = Math.floor(sec_num / 60);
    var seconds = Math.round(sec_num - (minutes * 60));

    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = minutes+':'+seconds;
    return time;
};
