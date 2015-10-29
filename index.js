
var express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	env = require('./config/env'),
	DB = require('./config/db');

var	app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

DB.connect(env.db.url, env.db.config).then(function(){

		// setup routes
		require('./config/routes')(app);

		// setup server
		app.listen(env.PORT, function(){
			console.log('Prelancer API server listening on port ' + env.PORT);
		});
	}).catch(function(err){
		console.log(err.stack);
		process.exit(1);
	});