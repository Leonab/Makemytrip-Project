var mongoose = require('mongoose'),
    location = require('./models/location')();
var Location = mongoose.model('Location');


function getLocation(res){
	Location.find(function(err, docs) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				return res.send(err);
			
            console.log(docs);
			return res.json(docs); // return all locations in JSON format
		});
};


module.exports = function(app) {
	
app.get('/api/locations', function(req, res) {

        // use mongoose to get all locations in the database
        getLocation(res);
    });
	
	
	
	

app.post('/api/locations2/', function(req, res) {

    console.log("yolo",req.body);
	
	//Update the votes in the db via mongoose
    Location.update({_id: req.body._id}, {votes: req.body.votes}, function(err, values) {
        if (!err) {
            res.json(values);
        } else {
            res.write("fail");
        }
    });

    });	
	




app.get('/api/query', function(req, res, next){
    
    var limit = 10;

    // get the max distance or set it to 8 kilometers
    var maxDistance = 500;

    // we need to convert the distance to radians
    // the raduis of Earth is approximately 6371 kilometers
    maxDistance /= 6371;

    // get coordinates [ <longitude> , <latitude> ]
    var coords = [];
    coords[0] = req.query.longitude;
    coords[1] = req.query.latitude;	
	console.log(req.query.latitude);
	console.log(req.query.longitude);

        Location.find({     // find a location
        loc: {
        $near: coords,
        $maxDistance: maxDistance
        }
        }).exec(function(err, locations) {
        if (err) {
        return res.send(500, err);
        }
		console.log(locations);
       return res.json(200, locations);
    });
		
   });
   
   
   
   
   
 app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
   });
};
   