
var create      = require('../utils/create');

module.exports = Player;

function Player(data) {
    this.node = create('audio', {
        src:            data.enclosure.url,
        className:      'pb-embed--entry-player',
        controls:       true
    });
    this.components = {};

    return this;
}
