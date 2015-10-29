
angular.module('prelancer.modal', [])
	.service('$modal', function($q){

		// the state of the modal
		// need two level for easier deletion management
		var state = {
			show: false,
			options: {}
		};

		var modalDeferred;

		function getState() { return state; }

		// open a modal, returning a promise for indicating closing
		function openModal(details) {
			// if the modal is already open, simply return the modal promise
			if(state.show) { return modalDeferred.promise; }

			// setup modal promise
			modalDeferred = $q.defer();
			// update the settings
			details.options = details.options || {};
			angular.extend(state, details);
			state.resolveValue = null;
			state.show = true;
			return modalDeferred.promise;
		}

		// set the resolve value (optional) for the modal caller to get a return value
		function setResolve(value) {
			state.resolveValue = value;
		}

		function closeModal() {
			state.show = false;
			modalDeferred.resolve(state.resolveValue);
		}

		return {
			getState: getState,
			open: openModal,
			close: closeModal,
			setResolve: setResolve
		};
	})
	.directive('customModal', function($modal, $document){
		return {
			scope: true,
			templateUrl: '/app/modal/modal.html',
			link: function(scope, elem, attrs) {

				scope.modalState = $modal.getState();
				var body = $document.find('body');

				scope.close = function($event) {
					$modal.close();
					$event.stopPropagation();
				};

				// watch for escape key
				function onDocumentKeydown(event) {
					if (!scope.processing && event.keyCode === 27) {
						scope.$apply(function(){
							$modal.close();
						});
					}
				}
				
				body.bind('keydown', onDocumentKeydown);

				scope.$watch('modalState.show', function(value){
					if(!value){
						body.unbind('keydown', onDocumentKeydown);
					}else{
						body.bind('keydown', onDocumentKeydown);
					}
				});
			}
		};
	});