const fs = require('fs');

const readFile = (filename, options) => new Promise((resolve, reject) => {
  fs.readFile(filename, options, (err, data) => {
    if (err) {
      return reject(err);
    }

    return resolve(data);
  });
});

module.exports = readFile;
