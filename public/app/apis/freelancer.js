
angular.module('prelancer.freelancer', [])
	.service('FreelancerAPI', function($http){

		var showcaseEndpoint = 'https://www.freelancer.com/api/users/0.1/showcases/?compact';
		var pageLimit = 20;

		this.getShowcases = function(page, keyword){

			var endpoint = showcaseEndpoint;
			if(keyword){
				endpoint += '&keywords[]=' + keyword;
			}
			if(page > 0){
				endpoint += '&offset=' + (page * pageLimit);
			}
			endpoint += '&limit=' + pageLimit;

			return $http.get(endpoint).then(function(result){
				var items = [];
				angular.forEach(result.data.result.showcases, function(showcase){

					var thumbnail = _.get(showcase, 'showcase_items[0].item_file.thumbnails.showcase.cdn_url');
					var url = _.get(showcase, 'showcase_items[0].item_file.cdn_url');
					if(url){
						items.push({
							source: 'freelancer',
							url: url,
							thumbnail: thumbnail,
							creator: showcase.user_id,
							title: showcase.title
						});
					}
				});
				return items;
			});
		};
	});