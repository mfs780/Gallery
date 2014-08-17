var Backbone = require('backbone'),
	PhotoModel = require('../models/photo');

module.exports = PhotosCollection = Backbone.Collection.extend({
	model: PhotoModel,
	url: '/api/photos',
	initialize: function(models, options) {
		if(options){
			this.url = '/api/albums/' + options.albumID + '/photos';
		}
	}
});