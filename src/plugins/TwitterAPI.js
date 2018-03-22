const Twitter = require('twitter');

class TwitterAPI {
    constructor(config) {
        this.twitter = new Twitter({
            consumer_key: config.tokens.twitter.consumerKey,
            consumer_secret: config.tokens.twitter.consumerSecret,
            access_token_key: config.tokens.twitter.accessToken,
            access_token_secret: config.tokens.twitter.accessTokenSecret
        });
    }

    static post(str) {
        return new Promise((res, rej) =>
        {
                this.twitter.post('statuses/update', { status: str }, (err, tweet, res) => {
                    if (!err) {
                        res(tweet);
                    } else {
                        rej(err);
                    }
                });
        });
    }
}

module.exports = TwitterAPI;