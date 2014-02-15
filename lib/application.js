/**
 * The file header application
 *
 * @module fileheader
 */

 // The modules that we make use of:
var fs = require('fs');
var fileheader = require('./fileheader');

// Constants:
var fileHeaderPath = 'fileheader.json';

exports.run = function() {
	// Set the current working directory:
	if (process.argv.length == 3) {
		process.chdir(process.argv[2]);
	}

	// Load in the fileheader.json file:
	fs.readFile(fileHeaderPath, 'utf8', function(err, data) {
		var config;
		
		if (err) {
			if (err.errno == 34) {
				console.log('Failed to find "' + fileHeaderPath + '"');
			} else {
				console.log('Failed to run fileheader.js');
			}
			process.exit(1);
		}
		
		config = JSON.parse(data);
		fileheader.run(config);
	});
};
