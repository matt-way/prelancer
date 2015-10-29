
var p = process.env;

module.exports = {
	PORT: p.PORT || 3000,
	db: {
		url: p.FL_DB_URL,
		config: {
			user: p.FL_DB_USER,
			pass: p.FL_DB_PASS,
			server: {
				auto_reconnect: true // supposedly default, but it seems not
			}	
		}
	},
	twitter: {
		consumer_secret: p.FL_TWITTER_CONSUMER_SECRET,
		consumer_key: p.FL_TWITTER_CONSUMER_KEY,
		access_token: p.FL_TWITTER_ACCESS_TOKEN,
		access_token_secret: p.FL_TWITTER_ACCESS_TOKEN_SECRET
	},
	freelancer: {
		id: p.FL_FREELANCER_AUTH_ID,
		token: p.FL_FREELANCER_AUTH_TOKEN
	}
};