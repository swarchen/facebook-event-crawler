'use strict';

var fs = require('fs'),
    graph = require('fbgraph'),
    accessToken = require('./accessToken_poster.js'),
    db = require('./db.js'),
    urls = [];

/**
 * craw the Facebook event.
 * @param {String} id The ID number of Facebook event.
 * @returns {JSON} Returns a JSON object containing fetched
 * data and options for next search iteration.
 */
function comment() {
  var data = null;
  var url = null;
  var wallPost = {
    message: `來看看自己的排名吧
              還有讚數跟留言的成長排名唷!!
              <3 <3 <3
              http://boocmarc.com/`
  };
  graph.setAccessToken(accessToken);
  

  db.get(function(err,docs){
    docs.forEach(function(post){
      var url = '622729007882144_' + post.link.split('gm.')[1].split('&type')[0] + '/comments';
      urls.push(url);
    })
    setTimeout(function(){
      postComment(urls.shift(), wallPost);
    },5000)
  });

  
}

function postComment(url,msg){
  setTimeout(function(){
    graph.post(url, msg, function(err, res) {
    if(err)
      console.error(err);
    console.log(res); // { id: xxxxx}
    if(urls.length > 0)
      postComment(urls.shift(),msg)
  });
  },5000)
}


module.exports = {
  comment: comment
};
