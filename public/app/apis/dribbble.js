
angular.module('prelancer.dribbble', [])
	.service('DribbbleAPI', function($http){

		var pageCount = 20;

		var shotsEndpoint = 'https://api.dribbble.com/v1/shots?callback=JSON_CALLBACK&access_token=c88109fa96e30456ae1556caf5e4d12b25944ec89b872a84fff04373e66a7960';
		
		this.getShots = function(page){

			shotsEndpoint += '&per_page=' + pageCount;
			shotsEndpoint += '&page=' + page;

			return $http.jsonp(shotsEndpoint).then(function(result){

				var items = [];

				angular.forEach(result.data.data, function(shot){

					var twitter = _.get(shot, 'user.links.twitter');
					var username = '';
					if(twitter){
						username = twitter.substr(20);
					}

					if(shot.images){
						items.push({
							url: shot.images.hidpi,
							thumbnail: shot.images.normal,
							source: 'dribbble',
							creator: username,
							title: shot.title
						});	
					}					
				});

				return items;
			});
		};
	});