var Backbone = require('backbone');

module.exports = AlbumModel = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: 'api/albums'
});