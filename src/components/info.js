
var create      = require('../utils/create'),
    Artwork     = require('./artwork');

module.exports = Info;

function Info(data) {
    this.node = create('div', {
        className:      'pb-embed--info'
    });
    this.components = {};
    this.components.artwork = new Artwork(data);
    this.node.appendChild(this.components.artwork.node);
    this.components.title = this.node.appendChild(create('h2', {
        textContent:    data.title,
        className:      'pb-embed--info-title'
    }));
    this.components.description = this.node.appendChild(create('p', {
        textContent:    data.description,
        className:      'pb-embed--info-description'
    }));
    this.components.subscribe = this.node.appendChild(create('a', {
        textContent:    'Subscribe',
        href:           data.link,
        target:         '_blank',
        className:      'pb-embed--info-subscribe'
    }));

    return this;
}
