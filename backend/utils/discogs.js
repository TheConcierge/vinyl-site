var Discogs = require('disconnect').Client;

var dis = new Discogs({userToken: 'AOUaGFIfNkFneBneqszqznnPIFDaSbpewWBHeWbO'});

let Vinyl = require('../models/vinyl.model');

module.exports = function() {
    var collect = {};

    function _add_to_categorized(release_id, instance_id) {
        dis.user().collection().editRelease('PseudoRomulus', 1, release_id, instance_id, {'folder_id': 2110850}, function(err, data) {
            console.log(data);
        });
    };

    function _add_to_database(release) {
        let vinyl = new Vinyl({
            img_location: "",
            owner: "Ryan Grant",
            discogs: release
        });

        vinyl.save()
            .then(vinyl => {
                console.log('added the vinyl');
            })
            .catch(err => {
                console.log('hit a oopsie');
            });
    };
    
    collect.import_collection = function(callback){
        dis.user().collection().getReleases('PseudoRomulus', 1, {per_page: 100}, function(err, data) {
            data['releases'].forEach(function(release){
                //console.log(release);
                //_add_to_categorized(release['id'], release['instance_id']);
                _add_to_database(release);
            });
        });
    };
    
    return collect;
};
