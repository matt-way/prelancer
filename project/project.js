

// Users inbox for retreiving ruffles

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	hat = require('hat'),
	env = require('../config/env'),
	_ = require('lodash'),
	Twitter = require('../twitter/twitter');

var Client = require('node-rest-client').Client;
var client = new Client();


var itemSchema = new Schema({
	url: String,
	thumbnail: String,
	source: String,
	creator: String,
	title: String,
	annotations: []
});


var projectSchema = new Schema({
	name: String,
	description: String,
	items: [itemSchema]
});

exports.name = 'Project';
exports.schema = projectSchema;
exports.model = mongoose.model(exports.name, exports.schema);

exports.create = function(req, res, next){

	var project = new exports.model();
	project.save().then(function(){
		return res.json({ id: project._id });
	}).catch(next);
};

exports.get = function(req, res, next){

	exports.model.findById(req.params.projectId).then(function(project){
		return res.json({ project: project });
	}).catch(next);	
};

exports.update = function(req, res, next){

	exports.model.findById(req.params.projectId).then(function(project){
		if(project){
			project.items = req.body.project.items;
		}
		project.save().then(function(){
			res.json({ success: true });
		});
	});
};

exports.postJob = function(req, res, next){

	var job = {
		title: 'Prelancer Test Test: ' + req.body.title,
		description: req.body.description + '\n\nThis project was created using Prelancer inspiration annotations, see them here: http://prelancer.herokuapp.com/' + req.params.projectId + '/summary',
		currency: {
			id: 1
		},
		budget: {
			minimum: parseInt(req.body.budget)
		},
		jobs: [
			{ id: 1}
		]
	};

	var args = {
		data: job,
		headers: {
			'Freelancer-Developer-Auth-V1': env.freelancer.id + ';' + env.freelancer.token
		}
	};

	console.log(args);

	// post the job to freelancer (test job)
	client.post('https://www.freelancer.com/api/projects/0.1/projects/?compact', args, function(data, response){
	    // parsed response body as js object 
	    console.log(data);
	    
	    if(data.status === 'error'){
	    	return next(new Error(data.error_code));
	    }

	    var doTwitter = false;
	    var items = req.body.project.items;
	    for(var i=0; i<items.length; i++){
	    	if(items.source === 'freelancer'){
	    		console.log('invited freelancer user @' + items.creator + ' to project');
	    	}else{
	    		doTwitter = true;
	    	}
	    }

	    if(doTwitter){
	    	Twitter.tweetAuthor('test', 'http://freelancer.com/' + data.result.seo_url);	
	    }
	    
	    return res.json({ url: data.result.seo_url });
	});
};


