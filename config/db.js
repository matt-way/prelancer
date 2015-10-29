

// Mongo db connection and tools

var mongoose = require('mongoose'),
	P = require('bluebird');

// setup mongoose to use bluebird promises
mongoose.Promise = P;

// connect to mongo database
exports.connect = function(url, options){

	return new P(function(resolve, reject){
		mongoose.connect(url, options);
		var db = mongoose.connection;
	
		db.on('open', resolve);
		db.on('error', reject);
	});
};

// disconnect from db
exports.disconnect = function(){
	mongoose.disconnect();
};