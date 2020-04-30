const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const vinylRoutes = express.Router();
const PORT = 4000;

let Vinyl = require('./models/vinyl.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/vinyl', { useNewUrlParser: true});
const connection = mongoose.connection;

let Discogs = require('./utils/discogs')();

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

vinylRoutes.route('/').get(function(req, res) {
    Vinyl.find(function(err, vinyls) {
        if (err) {
            console.log(err);
        } else {
            res.json(vinyls);
        }
    });
});

vinylRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Vinyl.findById(id, function(err, vinyl) {
        res.json(vinyl);
    });
});

vinylRoutes.route('/update/:id').post(function(req, res) {
    Vinyl.findById(req.params.id, function(err, vinyl) {
        if (!vinyl)
            res.status(404).send("vinyl not found");
        else
            vinyl.vinyl_img_url = req.body.vinyl_img_url;
            vinyl.vinyl_title = req.body.vinyl_title;
            vinyl.vinyl_artist = req.body.vinyl_artist;
            vinyl.vinyl_owner = req.body.vinyl_owner;
            
            vinyl.save().then(vinyl => {
                res.json('Vinyl Updated!');
            })
            .catch(err => {
                res.status(400).send('Could not update vinyl');
            });
    });
});

vinylRoutes.route('/add').post(function(req, res) {
    let vinyl = new Vinyl(req.body);
    vinyl.save()
        .then(vinyl => {
            res.status(200).json({'vinyl': 'vinyl added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new vinyl failed');
        });
});

vinylRoutes.route('/syncCollection').post(function(req, res) {
    Discogs.import_collection();
});

app.use('/vinyl', vinylRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
