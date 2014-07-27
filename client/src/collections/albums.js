var Backbone = require('backbone'),
    AlbumModel = require('../models/album');

module.exports = AlbumsCollection = Backbone.Collection.extend({
    model:  AlbumModel,
    url: '/api/albums'/*,
    what: function(){console.log('whaaaat')},
    byPath: function(path) {
    	filtered = this.filter(function(album) {
    		return album.get("path") === path;
    	});
    	return new AlbumCollection(filtered);
    }*/
});
