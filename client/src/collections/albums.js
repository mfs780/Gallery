var Backbone = require('backbone'),
    AlbumModel = require('../models/album');

module.exports = AlbumsCollection = Backbone.Collection.extend({
    model:  AlbumModel,
    url: '/api/albums',
    byPath: function(path) {
        filtered = this.filter(function(album) {
            return album.get("path") === path;
        });
        return new AlbumsCollection(filtered);
    },
    byName: function(name){
        filtered = this.filter(function(album){
            return album.get("name") === name;
        });
        return new AlbumsCollection(filtered);
    }
});
