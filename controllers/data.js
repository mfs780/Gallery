var models = require('../app/models'),
    fs = require('fs'),
    url = require('url'),
    md5 = require('MD5');

module.exports = {
    getPhoto: function(req, res){
        models.Photo.findOne({ _id: req.params.id }, function(err, data) {
            if (err) {
                res.json({error: 'Photo not found.'});
            } else {
                console.log('./photos/'+data.path+'/'+data.name);
                res.writeHead(200, {'Content-Type': 'image/jpg' });
                console.log(req.params);
                var img = fs.readFileSync('./photos/'+data.path+'/'+data.name);
                res.end(img, 'binary');
            }
        });        
    },
    albums: function(req, res) {
        models.Album.find({}, function(err, data) {
            res.json(data);
        });
    },
    photos: function(req, res) {
        models.Photo.find({}, function(err, data) {
            res.json(data);
        });
    },
    albumsGetById: function(req, res) {
        models.Album.find({ _id: req.params.id }, function(err, data) {
            if (err) {
                res.json({error: 'Album not found.'});
            } else {
                res.json(data);
            }
        });
    },
    photosGetById: function(req, res) {
        models.Photo.find({ _id: req.params.id }, function(err, data) {
            if (err) {
                res.json({error: 'Photo not found.'});
            } else {
                res.json(data);
            }
        });
    },
    photosInAlbumGetById: function(req, res) {
        models.Photo.find({ album: req.params.id }, function(err, data) {
            if (err) {
                res.json({error: 'Photo not found.'});
            } else {
                res.json(data);
            }
        });
    },
    /*add: function(req, res) {
        var newContact = new models.Contact(req.body);
        newContact.gravatar = md5(newContact.email);
        newContact.save(function(err, contact) {
            if (err) {
                res.json({error: 'Error adding contact.'});
            } else {
                res.json(contact);
            }
        });
    },*/
    // update: function(req, res) {
    //     console.log(req.body);
    //     models.Contact.update({ _id: req.body.id }, req.body, function(err, updated) {
    //         if (err) {
    //             res.json({error: 'Contact not found.'});
    //         } else {
    //             res.json(updated);
    //         }
    //     })
    // },
    /*delete: function(req, res) {
        models.Contact.findOne({ _id: req.params.id }, function(err, contact) {
            if (err) {
                res.json({error: 'Contact not found.'});
            } else {
                contact.remove(function(err, contact){
                    res.json(200, {status: 'Success'});
                })
            }
        });
    }*/
};
