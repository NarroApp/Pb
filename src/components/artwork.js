
var create      = require('../utils/create');

module.exports = Artwork;

function Artwork(data) {
    this.node = create('img', {
        src:            data.itunes.image,
        alt:            data.title,
        className:      'pb-embed--info-artwork'
    });
    this.components = {};

    return this;
}
