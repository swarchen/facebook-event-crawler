# Facebook-Event-Crawler
Crawl the events from Facebook.
"# fbevent" 
"# facebook-event-crawler" 

I use graph API to crawl an events feeds.

save the feeds with this schema in mongodb

```javascript
var FeedSchema = new mongoose.Schema({
	link : {type : String, required : true},
	_id :  {type : String, required : true},
	likes : {type : Number, default : 0},
	comments : {type : Number, default : 0},
	updateDate: { type: Date, default: Date.now },
	likesGrowth: {type : Number, default : 0},
	commentsGrowth: {type : Number, default : 0}
});
```



[fork from](https://github.com/john29917958/Facebook-Event-Crawler)
