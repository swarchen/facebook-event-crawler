'use strict';

var fs = require('fs'),
    graph = require('fbgraph'),
    accessToken = require('./accessToken.js'),
    db = require('./db.js'),
    resultManager = require('./result.js'),
    next = null;

/**
 * craw the Facebook event.
 * @param {String} id The ID number of Facebook event.
 * @returns {JSON} Returns a JSON object containing fetched
 * data and options for next search iteration.
 */
function crawl() {
  var result = null;
  var url = null;

  graph.setAccessToken(accessToken);

  if(next == null)
    url = '622729007882144/photos?fields=link,images,likes.summary(true),comments.summary(true)&limit=50&pretty=1';
  else
    url = '622729007882144/photos?fields=link,images,likes.summary(true),comments.summary(true)&limit=50&pretty=1&after=' + next;

  graph.get(url, function(err, res) {
  if (err) {
    console.error(err);
    setTimeout(function(){
      crawl();
    },10000);
  }
  res.data.forEach(function(data){
    var updateDate = new Date();
    var feed = {
      _id: data.id,
      content:{
        link: data.link,
        likes: data.likes.summary.total_count,
        comments: data.comments.summary.total_count,
        imgUrl:data.images[0].source,
        updateDate : updateDate,
        likesGrowth: 0,
        commentsGrowth: 0
      }
    }
    db.updateAndInsert(feed);
  })

  if(res.paging)
    next = res.paging.cursors.after;
  else
    next = null;
  console.log(next);
  crawl();
});
}


function crawlFirst() {
  var result = null;
  var url = null;

  graph.setAccessToken(accessToken);
  url = '622729007882144/photos?fields=link,images,likes.summary(true),comments.summary(true)&limit=10&pretty=1';

   
  graph.get(url, function(err, res) {
  if (err) {
    console.error(err);
    setTimeout(function(){
      crawl();
    },60000);
  }
  res.data.forEach(function(data){
    var updateDate = new Date();
    var feed = {
      _id: data.id,
      content:{
        link: data.link,
        likes: data.likes.summary.total_count,
        comments: data.comments.summary.total_count,
        imgUrl:data.images[0].source,
        likesGrowth: 0,
        commentsGrowth: 0
      }
    }
    db.updateAndInsertFirst(feed);
  })
});
}


module.exports = {
  crawl: crawl,
  crawlFirst:crawlFirst
};
