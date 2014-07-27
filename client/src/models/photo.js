var Backbone = require('backbone');

module.exports = PhotoModel = Backbone.Model.extend({
	idAttribute: '_id',
	urlRoot: 'api/photos',
	/*initialize: function(model) {
		$.ajax({
			url:"/photo/"+model._id,
			type: "get"
		})
		.success(function(response){
			console.log('success');
			this.pic = response;
		})
		.error(function(){
			console.log('error');
		});	
		console.log('done');	
	}*/
});