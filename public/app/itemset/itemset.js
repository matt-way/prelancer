
// returns image item sets using multiple community apis, and filters

angular.module('prelancer.itemset', [])
	.service('ItemSet', function($q, FreelancerAPI, DribbbleAPI){

		function shuffle(o){
		    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		    return o;
		}

		this.getItems = function(page, keyword){

			if(keyword){
				return FreelancerAPI.getShowcases(page, keyword);
			}else{
				return $q.all([FreelancerAPI.getShowcases(page), DribbbleAPI.getShots(page)]).then(function(result){
					var allItems = [];
					angular.forEach(result, function(list){
						allItems = allItems.concat(list);
					});
					return shuffle(allItems);
				});
			}
		};
	});