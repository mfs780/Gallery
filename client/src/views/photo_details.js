var Marionette = require('backbone.marionette');

module.exports = PhotoDetailsView = Marionette.ItemView.extend({
    template: require('../../templates/photo_details.hbs'),
    events: {
        'click a.back': 'goBack'
    },

    goBack: function(e) {
        e.preventDefault();
        window.App.controller.home();
    }
});