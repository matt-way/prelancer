
angular.module('prelancer.annotator', [])
	.directive('annotator', function($timeout){
		return {
			scope: {
				item: '=annotator'
			},
			link: function(scope, elem, attrs){

				var itemSrc;

				elem.bind('load', function(e){
					anno.makeAnnotatable(elem[0]);
					itemSrc = elem[0].src;

					angular.forEach(scope.item.annotations, function(annotation){
						if(attrs.readOnly === 'true'){
							annotation.editable = false;
							anno.hideSelectionWidget(itemSrc);
						}
						anno.addAnnotation(annotation);
					});

					anno.addHandler('onAnnotationCreated', function(annotation) {
						if(annotation.src === itemSrc){
							var annos = anno.getAnnotations(itemSrc);
							scope.item.annotations = annos;
							console.log(scope.item);
						}
					});
				});
			}
		};
	});