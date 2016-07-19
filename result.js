'use strict';

var fs = require('fs'),
    filePath = 'results/result.json';

/**
 * Clear content in result.json.
 */
function clear() {
  fs.truncate(filePath, 0);
}

/**
 * Append received JSON from Facebook graph API.
 * @param {JSON} data The received JSON data.
 */
function append(data, endOfData) {
  if (endOfData === null || endOfData === 'undefined') {
    endOfData = '';
  }

  fs.open(filePath, 'a', function (err, id) {
    if (err) {
      return console.error(err);
    }

    fs.appendFile(filePath, JSON.stringify(data, null, 2) + endOfData, function (err) {
      if (err) {
        return console.error(err);
      }
    });
  });
}

module.exports = {
  append: append,
  clear: clear
};
