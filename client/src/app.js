var Marionette = require('backbone.marionette'),
    Controller = require('./controller'),
    Router = require('./router'),
    AlbumModel = require('./models/album'),
    PhotosCollection = require('./collections/photos'),
    AlbumsCollection = require('./collections/albums');

module.exports = App = function App() {};

App.prototype.start = function(){
    App.core = new Marionette.Application();

    App.core.on("initialize:before", function (options) {
        App.core.vent.trigger('app:log', 'App: Initializing');

        App.views = {};
        App.data = {};

        // load up some initial data:
        var photos = new PhotosCollection();
        photos.fetch({
            success: function() {
                App.core.vent.trigger('app:log', 'Success');
                App.data.photos = photos;
            }
        });
        
        var albums = new AlbumsCollection();
        albums.fetch({
            success: function() {
                App.core.vent.trigger('app:log', 'Success');
                App.data.albums = albums;
                App.core.vent.trigger('app:start');
            }
        });
    });

    App.core.vent.bind('app:start', function(options){
        App.core.vent.trigger('app:log', 'App: Starting');
        if (Backbone.history) {
            App.controller = new Controller();
            App.router = new Router({ controller: App.controller });
            App.core.vent.trigger('app:log', 'App: Backbone.history starting');
            Backbone.history.start();
        }

        //new up and views and render for base app here...
        App.core.vent.trigger('app:log', 'App: Done starting and running!');
    });

    App.core.vent.bind('app:log', function(msg) {
        console.log(msg);
    });

    App.core.start();
};
