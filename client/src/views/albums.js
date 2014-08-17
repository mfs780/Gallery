var Marionette = require('backbone.marionette');

var itemView = Marionette.ItemView.extend({
    template: require('../../templates/album_small.hbs'),
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },
    events: {
        'click .thumb': 'openAlbum'
    },

    openAlbum: function() {
        window.App.core.vent.trigger('app:log', 'Albums View: openAlbum hit.');
        window.App.controller.openAlbum(this.model.id);
    }
});

module.exports = CollectionView = Marionette.CollectionView.extend({
    initialize: function() {
        this.listenTo(this.collection, 'change', this.render);
    },
    itemView: itemView
});
