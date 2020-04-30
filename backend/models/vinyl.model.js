const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Vinyl = new Schema({
    img_location: {Type: String},
    owner: {Type: String},
    discogs: [Schema.Types.Mixed]
}, {strict: false});

module.exports = mongoose.model('Vinyl', Vinyl);
