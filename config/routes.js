
var path = require('path'),
	Project = require('../project/project.js');

module.exports = function(app){

	app.get('/api/project', Project.create);
	app.get('/api/project/:projectId', Project.get);
	app.post('/api/project/:projectId', Project.update);

	app.post('/api/project/:projectId/post-job', Project.postJob);

	app.get('*', function(req, res, next){
		return res.sendFile(path.join(__dirname, '../public/index.html'));
	});
};