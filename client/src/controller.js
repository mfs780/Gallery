var Marionette = require('backbone.marionette'),
    AlbumsView = require('./views/albums'),
    PhotosView = require('./views/photos'),
    PhotoDetailsView = require('./views/photo_details'),
    PhotosCollection = require('./collections/photos');

module.exports = Controller = Marionette.Controller.extend({
    initialize: function() {
        App.core.vent.trigger('app:log', 'Controller: Initializing');
        View = new AlbumsView({ collection: window.App.data.albums.byPath("")});
        window.App.views.albumsView = View;
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
        console.log('/api/albums/'+id);
        var photos = new PhotosCollection([], {albumID: id});
        photos.fetch({
            success: function() {
                App.core.vent.trigger('app:log', 'Success');
                App.data.photos = photos;
                console.log(photos.models[0].attributes.path);
                window.App.views.photosView = new PhotosView({collection: window.App.data.photos});
                var view = window.App.views.photosView;
                self.renderView(self.moreAlbums(photos.models[0].attributes.path),view);
                window.App.router.navigate('album/'+id);
            }
        });        
    },

    moreAlbums: function(path){
        var self = this;
        view = new AlbumsView({ collection: window.App.data.albums.byPath(path)});
        return view;
    },

    openPhoto: function(id){
        App.core.vent.trigger('app:log', 'Controller: "Open Photo" route hit.');
        var view = new PhotoDetailsView({model: window.App.data.photos.get(id)});
        this.renderView(view);
        window.App.router.navigate('photo/' + id);
    },

    renderView: function(view, other) {
        this.destroyCurrentView(view);
        App.core.vent.trigger('app:log', 'Controller: Rendering new view.');
        $('#main-app').html(view.render().el);
        if(other) $('#main-app').append(other.render().el);
    },

    destroyCurrentView: function(view) {
        if (!_.isUndefined(window.App.views.currentView)) {
            App.core.vent.trigger('app:log', 'Controller: Destroying existing view.');
            window.App.views.currentView.close();
        }
        window.App.views.currentView = view;
    }
});
