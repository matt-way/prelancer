
var TwitterBot = require("node-twitterbot").TwitterBot,
	env = require('../config/env');

// Include your access information below
var Bot = new TwitterBot(env.twitter);

exports.tweetAuthor = function(twitterId, jobUrl){
	Bot.tweet('Hey @_MattWay, your work has been used as inspiration in a job on Freelancer. Check it out! ' + jobUrl);
};
