var express = require('express');
var app = express();
var mongoose = require('mongoose');
var async = require('async');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var methodOverride = require('method-override');

mongoose.connect('mongodb://leonab:helloworld@ds057816.mlab.com:57816/hindsight'), function(err) {
  if (err) throw err;
};

var port= process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(express.methodOverride());
app.use(app.router);
app.use(methodOverride('X-HTTP-Method-Override'))


require('./app/routes.js')(app);


app.listen(port, function() {
  console.log("App listening on port" + port);
});   