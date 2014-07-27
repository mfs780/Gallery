var Marionette = require('backbone.marionette'),
    AlbumsView = require('./views/albums'),
    PhotosView = require('./views/photos'),
    PhotosCollection = require('./collections/photos');

module.exports = Controller = Marionette.Controller.extend({
    initialize: function() {
        App.core.vent.trigger('app:log', 'Controller: Initializing');
        window.App.views.albumsView = new AlbumsView({ collection: window.App.data.albums });
    },

    home: function() {
        App.core.vent.trigger('app:log', 'Controller: "Home" route hit.');
        var view = window.App.views.albumsView;
        this.renderView(view);
        window.App.router.navigate('#');
    },

    openAlbum: function(id){
        var self = this;
        App.core.vent.trigger('app:log', 'Controller: "Open Album" route hit.');
        console.log('/api/albums'+id+'/photos');
        var photos = new PhotosCollection();
        photos.fetch({
            success: function() {
                App.core.vent.trigger('app:log', 'Success');
                App.data.photos = photos;
                window.App.views.photosView = new PhotosView({collection: window.App.data.photos});
                var view = window.App.views.photosView;
                self.renderView(view);
                window.App.router.navigate('album/'+id+'/photos');
            }
        });        
    },

    openPhoto: function(id){
        App.core.vent.trigger('app:log', 'Controller: "Open Photo" route hit.');
    },

    renderView: function(view) {
        this.destroyCurrentView(view);
        App.core.vent.trigger('app:log', 'Controller: Rendering new view.');
        $('#main-app').html(view.render().el);
    },

    destroyCurrentView: function(view) {
        if (!_.isUndefined(window.App.views.currentView)) {
            App.core.vent.trigger('app:log', 'Controller: Destroying existing view.');
            window.App.views.currentView.close();
        }
        window.App.views.currentView = view;
    }
});
