
angular.module('prelancer.project', [])
	.service('ProjectService', function($q, $localStorage, API){

		var state = {};

		this.getId = function(){
			if($localStorage.projectId){
				return $q.when($localStorage.projectId);
			}else{
				return API.project.create().$promise.then(function(response){
					$localStorage.projectId = response.id;
					return response.id;
				});
			}
		}

		this.load = function(id){
			return API.project.get({ id: id }).$promise.then(function(result){
				state.project = result.project;
				return state;
			});
		};

		this.save = function(){
			return API.project.save({ id: state.project._id }, state).$promise;
		};

		this.postJob = function(details){
			return API.project.postJob({ id: state.project._id }, details).$promise;
		};

		this.addItem = function(item){
			if(!state.project.items){
				state.project.items = [];
			}
			state.project.items.push(item);
		};

		this.getState = function(){
			return state;
		};
	});