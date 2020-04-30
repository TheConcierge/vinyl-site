const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Vinyl = new Schema({
    vinyl_img_url: {
        type: String
    },
    vinyl_title: {
        type: String
    },
    vinyl_artist: {
        type: String
    },
    vinyl_owner: {
        type: String
    }
});

module.exports = mongoose.model('Vinyl', Vinyl);
