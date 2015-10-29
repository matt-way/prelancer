
angular.module('prelancer.workspace', [])
	.controller('WorkspaceCtrl', function($scope, $modal, ItemSet, ProjectService){

		$scope.tags = [
			{ label: 'All', code: '' },
			{ label: 'Logo', code: 'logo' },
			{ label: 'Web Design', code: 'web' },
			{ label: 'Branding', code: 'branding' }
		];

		ItemSet.getItems(0).then(function(items){
			$scope.items = items;
		});

		$scope.curPage = 0;

		$scope.pState = ProjectService.getState();

		$scope.selectedTag = $scope.tags[0];
		$scope.selectTag = function(tag){
			if($scope.selectedTag.label !== tag.label){
				$scope.selectedTag = tag;
				$scope.items = [];
				$scope.curPage = 0;
				ItemSet.getItems($scope.curPage, tag.code).then(function(items){
					$scope.items = items;
				});	
			}			
		};

		$scope.loadMore = function(){
			if($scope.items && $scope.items.length > 0){
				$scope.curPage++;
				ItemSet.getItems($scope.curPage, $scope.selectedTag.code).then(function(items){
					$scope.items = $scope.items.concat(items);
				});	
			}			
		};

		$scope.addImage = function(card){
			$modal.open({
				templateUrl: '/app/workspace/detail.html',
				options:{
					item: card,
					adding: true	
				}				
			});
		};

		$scope.editImage = function(item){
			$modal.open({
				templateUrl: '/app/workspace/detail.html',
				options:{
					item: item,
					adding: false
				}				
			});
		};

		$scope.submit = function(){
			$modal.open({
				templateUrl: '/app/workspace/submit.html'
			});
		}
	})
	.controller('DetailCtrl', function($scope, $modal, ProjectService){
		$scope.options = $modal.getState().options;		
		$scope.item = $scope.options.item;

		$scope.save = function($event){

			if($scope.options.adding){
				ProjectService.addItem($scope.item);
			}

			ProjectService.save();

			$scope.goodClose($event);
		};

		$scope.goodClose = function($event){
			anno.reset();
			$scope.close($event);
		};
	})
	.controller('SubmitCtrl', function($scope, $state, ProjectService){
		$scope.job = {};

		var project = ProjectService.getState().project;

		$scope.submitJob = function($event){
			/*$scope.job.project = project;
			ProjectService.postJob($scope.job).then(function(result){
				console.log(result);
			});*/
			$state.go('project.summary', { projectId: project._id });
		};
	});