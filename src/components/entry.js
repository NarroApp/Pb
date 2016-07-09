
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
    this.components.title = this.node.appendChild(create('h3', {
        className:      'pb-embed--entry-title'
    }));
    this.node.appendChild(this.components.player.node);
    this.components.meta = this.node.appendChild(create('div', {
        className:      'pb-embed--entry-meta'
    }));
    this.components.meta.appendChild(create('span', {
        textContent:    (new Date(data.pubDate)).toLocaleDateString(),
        className:      'pb-embed--entry-date'
    }));
    this.components.description = this.components.meta.appendChild(create('p', {
        innerHTML:      data.content,
        className:      'pb-embed--entry-description'
    }));
    this.components.title.appendChild(create('a', {
        textContent:    data.title,
        href:           data.link,
        target:         '_blank',
        className:      'pb-embed--entry-link'
    }));

    return this;
}
