var Marionette = require('backbone.marionette'),
    AlbumsView = require('./views/albums'),
    PhotosView = require('./views/photos'),
    PhotoDetailsView = require('./views/photo_details'),
    PhotosCollection = require('./collections/photos'),
    inline = require('inline');

module.exports = Controller = Marionette.Controller.extend({
    initialize: function() {
        App.core.vent.trigger('app:log', 'Controller: Initializing');
        View = new AlbumsView({
            collection: window.App.data.albums.byPath("")
        });
        window.App.views.albumsView = View;
    },

    home: function() {
        App.core.vent.trigger('app:log', 'Controller: "Home" route hit.');
        var view = window.App.views.albumsView;
        this.renderView(view);
        window.App.router.navigate('#');
    },

    openAlbum: function(id) {
        var self = this;
        App.core.vent.trigger('app:log', 'Controller: "Open Album" route hit.');
        console.log('/api/albums/' + id);
        var photos = new PhotosCollection([], {
            albumID: id
        });
        photos.fetch({
            success: function() {
                App.core.vent.trigger('app:log', 'Success');
                App.data.currPhotos = photos;
                console.log(photos.models[0].attributes.path);
                window.App.views.photosView = new PhotosView({
                    collection: window.App.data.currPhotos
                });
                var view = window.App.views.photosView;
                self.renderView(self.moreAlbums(photos.models[0].attributes.path), view);
                window.App.router.navigate('album/' + id);
            }
        });
    },

    moreAlbums: function(path) {
        var self = this;
        view = new AlbumsView({
            collection: window.App.data.albums.byPath(path)
        });
        return view;
    },

    openPhoto: function(id) {
        var self = this;
        App.core.vent.trigger('app:log', 'Controller: "Open Photo" route hit.');
        var model = window.App.data.currPhotos.get(id);
        var view = new PhotoDetailsView({
            model: model
        });
        this.renderView(view);
        console.log(view.model);
        //view.setInline($('#caption'));
        $('#caption').inline({
            textSize: "250%",
            defaultValue: "Click to create a Caption",
            callback: (function(c) {
                model.set({
                    caption: c
                });
            })
        });
        window.App.router.navigate('photo/' + id);
    },

    setCaption: function() {
        console.log("caption set");
    },

    renderView: function(view, other) {
        this.destroyCurrentView(view);
        App.core.vent.trigger('app:log', 'Controller: Rendering new view.');
        $('#main-app').html(view.render().el);
        if (other) $('#main-app').append(other.render().el);
    },

    destroyCurrentView: function(view) {
        if (!_.isUndefined(window.App.views.currentView)) {
            App.core.vent.trigger('app:log', 'Controller: Destroying existing view.');
            window.App.views.currentView.close();
        }
        window.App.views.currentView = view;
    }
});