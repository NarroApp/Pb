
var create      = require('../utils/create');

module.exports = Player;

/**
 * Render an audio player
 *
 * @access public
 * @param {object} data a podcast feed entry
 * @return {object} Player instance
 */
function Player(data) {
    this.node = create('audio', {
        src:            data.enclosure.url,
        className:      'pb-embed--entry-player',
        controls:       true
    });
    this.components = {};

    return this;
}
