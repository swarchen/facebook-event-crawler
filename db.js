'use strict';
var mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient,
    url = 'mongodb://localhost:27017/facebook';

/**
 * Execute action to the parties collection.
 * @returns {Collection} Returns the parties Collection.
 */
function exec(callback) {
  MongoClient.connect(url, function (err, db) {
    var collection;

    if (err) {
      return console.error(err);
    }

    collection = db.collection('feeds');

    if (typeof callback === 'function') {
      callback(collection, db);
    }
  });
}

/**
 * Insert data into parties collection.
 * @param {JSON} data The crawled data to be inserted.
 */
function insert(data) {
  exec(function (collection, db) {
    collection.findAndModify({_id:data._id},null,{$set:data.content},{upsert :true}, function (err, result) {
      if (err) {
        return console.error(err);
      }
      db.close();
    });
  });
}


function updateAndInsert(data) {
  exec(function (collection, db) {
    collection.findOne({_id:data._id}, function (err, docs) {
      if (err) {
        return console.error(err);
      }
      
      if (docs){
        data.content.likesGrowth = Math.floor(86400000 * (data.content.likes - docs.likes) / (data.content.updateDate - docs.updateDate)) ;
        data.content.commentsGrowth = Math.floor(86400000 * (data.content.comments - docs.comments) / (data.content.updateDate - docs.updateDate)) ;
      }
      collection.findAndModify({_id:data._id},null,{$set:data.content},{upsert :true}, function (err, result) {
        if (err) {
          return console.error(err);
        }
        db.close();
      });
    });
  });
}

function updateAndInsertFirst(data) {
  exec(function (collection, db) {
    collection.findOne({_id:data._id}, function (err, docs) {
      if (err) {
        return console.error(err);
      }
      
      collection.findAndModify({_id:data._id},null,{$set:data.content},{upsert :true}, function (err, result) {
        if (err) {
          return console.error(err);
        }
        db.close();
      });
    });
  });
}

/**
 * Count data in collection.
 * @param {JSON} data The crawled data to be inserted.
 */
function count() {
  exec(function (collection, db) {
    collection.count(function(err, count) {
      if (err) {
        return console.error(err);
      }
      console.log("Total Feeds in data base " + count);
      db.close();
    });
  });
}

/**
 * Reset and clear all data in parties collection.
 */
function clear() {
  exec(function (collection, db) {
    collection.remove();
    db.close();
  });
}


function get(cb) {
  exec(function (collection, db) {
    collection.find().toArray(function(err, docs){
      if (err) {
        return console.error(err);
      }
      db.close();
      return cb(err,docs);
    })
  });
}

module.exports = {
  insert: insert,
  clear: clear,
  count: count,
  get: get,
  updateAndInsert:updateAndInsert,
  updateAndInsertFirst:updateAndInsertFirst
};
