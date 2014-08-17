var Marionette = require('backbone.marionette'),
    inline = require('inline');

module.exports = PhotoDetailsView = Marionette.ItemView.extend({
	template: require('../../templates/photo_details.hbs'),
	events: {
		'click #prev': 'prev',
		'click #next': 'next',
		'update_caption': 'changeCaption'
	},

	initialize: function() {
		this.model.on('change', this.render, this);
		this.index = this.model.collection.indexOf(this.model);
	},

	prev: function(e) {		
		e.preventDefault();
		var newModel = this.model.collection.at(this.index - 1);
		window.App.controller.openPhoto(newModel.id);
	},

	next: function(e) {		
		e.preventDefault();
		var newModel = this.model.collection.at(this.index + 1);
		window.App.controller.openPhoto(newModel.id);
	}
});