var mongoose = require('mongoose'),
    models = require('./models'),
    _ = require('underscore'),
    fs = require('fs'),
    exif = require('exif.js'),
    walk = require('walk'),
    util = require('util'),
    path = require('path'),
    im = require('imagemagick');

module.exports = {
    traverse: function() {

        console.log("traverse");

        var options = {
            followLinks: false,
            filters: ["Temp", "_Temp"]
        };

        walker = walk.walk("./photos", options);

        walker.on("names", function(root, nodeNamesArray) {
            //console.log("names");
            nodeNamesArray.sort(function(a, b) {
                if (a > b) return 1;
                if (a < b) return -1;
                return 0;
            });
        });

        walker.on("directories", function(root, dirsStatsArray, next) {
            var array = root.split("/").splice(2);
            var path = array.join("/");

            _.each(dirsStatsArray, function(e, i , a){
                if(e.type === 'directory'){

                    var albumName = e.name;

                    models.Album.find({name: albumName, path: path}, function(err, album){

                    if (err) return handleError(err);
                    if (!album.length)  {
                        //Creete New Album
                        var newAlbum = new models.Album({
                            name: albumName,
                            path: path
                        });
                        newAlbum.save(function(err, album){
                            console.log('Successfully created Album: ' + album._id);    
                        });                        
                    } else {
                        console.log('Album Already Exists');
                    };
                });

                }
                next();
            });
        });

        walker.on("file", function(root, fileStats, next) {
            var array = root.split("/").splice(2);
            var path = array.join("/");
            var albumName = array[array.length-1];
            var albumPath = array.slice(0,-1).join("/");         

            //console.log(albumName + ' @ ' + albumPath);

            models.Album.findOne({name: albumName, path: albumPath}, function(err, album){
                if(album) {

                    models.Photo.find({name: fileStats.name, path: path}, function(err, photo){               

                        if (err) return handleError(err);
                        if (!photo.length && fileStats.name !== "Thumbs.db") {
                            //Create New Photo
                            var newPhoto = new models.Photo({
                                name: fileStats.name,
                                path: path,
                                album: album._id
                            });
                            newPhoto.save(function(err, photo) {
                                console.log('Successfully created photo: ' + photo._id);
                                album.photos.push(photo._id);
                                album.save(function(err, album){
                                    console.log('Album '+ album._id +' updated with photo: ' + photo._id);
                                });
                            });
                        } else {
                            console.log("Photo Already Exists")
                        };

                        
                    });
                    
                }
            });
            

            next();


        });

        walker.on("errors", function(root, nodeStatsArray, next) {
            next();
        });

        walker.on("end", function() {
            console.log("all done");
        });
    }
};