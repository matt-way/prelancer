
var dependencies = [
	'ngResource',
	'ngStorage',
	'ui.router',
	'prelancer.api',
	'prelancer.project',
	'prelancer.workspace',
	'prelancer.summary',
	'prelancer.annotator',
	'prelancer.modal',
	'akoenig.deckgrid',
	'prelancer.itemset',
	'prelancer.freelancer',
	'prelancer.dribbble',
	'infinite-scroll'
];

angular.module('prelancer', dependencies)
	.config(function($stateProvider, $urlRouterProvider, $locationProvider){

		$locationProvider.html5Mode(true);

		$stateProvider
			.state('app', {
				url: '/',
				controller: 'AppCtrl'
			})
			.state('project', {
				abstract: true,
				url: '/:projectId',
				template: '<div ui-view=""></div>',
				resolve: {
					project: function($stateParams, ProjectService){
						return ProjectService.load($stateParams.projectId);
					}
				}
			})
			.state('project.workspace', {
				url: '/workspace',
				controller: 'WorkspaceCtrl',
				templateUrl: 'app/workspace/workspace.html'
			})
			.state('project.summary', {
				url: '/summary',
				controller: 'SummaryCtrl',
				templateUrl: 'app/summary/summary.html'
			});
	})
	.run(function($rootScope){
		$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
			console.log('state change error:', error);
		});
	})
	.controller('AppCtrl', function($scope, $state, ProjectService){

		ProjectService.getId().then(function(id){
			$state.go('project.workspace', { projectId: id });
		});
	});