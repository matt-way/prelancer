
// module for dealing with prelancer api
angular.module('prelancer.api', [])
	.service('API', function($resource){

		var location = 'http://127.0.0.1:3000/api';

		this.project = $resource(location + '/project/:id/:actionId', {
			id: '@id', actionId: '@actionId'
		}, {
			create: { method: 'GET' },
			postJob: { method: 'POST', params: { actionId: 'post-job' } }	
		});
	});