// main.js
(function(window, document) {
    var PB = require('./pb');

    window.pb = {
        init:           pbInit,
        createEmbed:    createEmbed
    };
    pbInit();

    /**
     * Initialize all available podcast embeds on page
     *
     * @access public
     */
    function pbInit() {
        var embeds = [],
            selector = '.pb-embed',
            i = 0;

        embeds = document.querySelectorAll(selector);
        for (i = 0; i < embeds.length; i++) {
            createEmbed(embeds[i]);
        }
    }

    /**
     * Create an embed within the node
     *
     * @access public
     * @param {object} node DOM node
     * @param {string} feed podcast URL (optional)
     * @return {object} PB instance
     */
    function createEmbed(node, feed) {
        feed = feed || node.dataset.feed;
        return new PB(node, feed);
    }
})(window, window.document);
