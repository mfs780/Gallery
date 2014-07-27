 var Marionette = require('backbone.marionette');

module.exports = Router = Marionette.AppRouter.extend({
    appRoutes: {
        ''  : 'home',
        'album/:id' : 'openAlbum'
/*        'details/:id' : 'details',
        'add' : 'add'*/
    }
});
