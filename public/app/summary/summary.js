
angular.module('prelancer.summary', [])
	.controller('SummaryCtrl', function($scope, ProjectService){
		
		$scope.state = ProjectService.getState();
	});