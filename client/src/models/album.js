var Backbone = require('backbone');

module.exports = AlbumModel = Backbone.Model.extend({
	idAttribute: '_id',
	thumbnail: '',
	urlRoot: 'api/albums',
	initialize: function() {
		this.setThumb();
	},
	setThumb: function() {
		var rand = Math.floor(Math.random() * this.get('__v'));
		var photoID = this.get('photos')[rand];
		var photoModel = window.App.data.photos.get(photoID);
		var photoName = photoModel.get('name');

		var path = (this.get('path') === "")? this.get('path'): this.get('path') + '/';		
		var src = "../Photos/"+path + this.get('name') +"/thumbnails/"+ photoName;

		this.set('thumb', src);
	}
});