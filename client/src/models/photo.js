var Backbone = require('backbone');

module.exports = PhotoModel = Backbone.Model.extend({
	idAttribute: '_id',
	urlRoot: 'api/photos',
	initialize: function(model) {
		urlRoot = '/api/photos/' + model._id;
		this.bind('change', function(){ this.save(); });
	}
});