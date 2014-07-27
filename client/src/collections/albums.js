var Backbone = require('backbone'),
    AlbumModel = require('../models/album');

module.exports = AlbumsCollection = Backbone.Collection.extend({
    model:  AlbumModel,
    url: '/api/albums'
});
