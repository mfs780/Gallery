var home = require('../controllers/home'),
    data = require('../controllers/data');

module.exports.initialize = function(app) {
    app.get('/', home.index);
    app.get('/photo/:id', data.getPhoto);
    app.get('/api/albums', data.albums);
    app.get('/api/photos', data.photos);
    app.get('/api/albums/:id', data.albumsGetById);
    app.get('/api/albums/:id/photos', data.photosInAlbumGetById);
    //app.get('/api/albums/:aid/photos/:pid', contacts.getById);
    app.get('/api/photos/:id', data.photosGetById);
    // app.post('/api/contacts', contacts.add);
    // app.put('/api/contacts', contacts.update);
    // app.delete('/api/contacts/:id', contacts.delete);
};
