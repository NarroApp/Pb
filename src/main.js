// main.js
(function(window, document) {
    var PB = require('./pb');

    window.pb = {
        init:           pbInit,
        createEmbed:    createEmbed
    };
    pbInit();

    function pbInit() {
        var embeds = [],
            selector = '.pb-embed',
            i = 0;

        embeds = document.querySelectorAll(selector);
        for (i = 0; i < embeds.length; i++) {
            createEmbed(embeds[i]);
        }
    }

    function createEmbed(node, feed) {
        feed = feed || node.dataset.feed;
        return new PB(node, feed);
    }
})(window, window.document);
