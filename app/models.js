var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var People = new Schema({
    email:      { type: String },
    name: {
        first:  { type: String },
        last:   { type: String }
    }
});

var Album = new Schema({
    name:        { type: String },
    path:        { type: String },
    lock:        { type: Boolean },
    description: { type: String },
    date:        { type: Date },
    photos:      [String],
    albums:      [Album],
    people:      [People]
});

var Photo = new Schema({
    name:      { type: String },
    path:      { type: String },
    album:     { type: String },
    caption:   { type: String },
    date:      { type: Date },
    people:    [People]
});

var Collection = new Schema({
    name:      { type: String },
    caption:   { type: String },
    date:      { type: Date },
    people:    [People],
    photos:    [Photo]
});

module.exports = {
    People: mongoose.model('People', People),
    Album: mongoose.model('Album', Album),
    Photo: mongoose.model('Photo', Photo),
    Collection: mongoose.model('Collection', Collection),
};
