
var create      = require('../utils/create');

module.exports = Artwork;

/**
 * Render podcast artwork
 *
 * @access public
 * @param {object} data
 * @return {object} Artwork instance
 */
function Artwork(data) {
    this.node = create('img', {
        src:            data.itunes.image,
        alt:            data.title,
        className:      'pb-embed--info-artwork'
    });
    this.components = {};

    return this;
}
