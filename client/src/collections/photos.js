var Backbone = require('backbone'),
    PhotoModel = require('../models/photo');

module.exports = PhotosCollection = Backbone.Collection.extend({
    model:  PhotoModel,
    url: '/api/photos',
    initialize: function(models, options){
    	//this.model.url = modelURL;
    }
});