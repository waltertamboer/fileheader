// The modules that we make use of:
var fs = require('fs');
var path = require('path');
var variables = require('./variables');
var docBlockRegex = /\/\*{2}([\s\S]+?)\*\/\s*/g;
	
exports.run = function(config) {
	var files = iterateFiles('.', config);
	
	updateFileList(files, config);
};

function parseTemplate(config) {
	var template = config.template;
	
	if (typeof(template) == 'object') {
		template = template.join("\n");
	}
	
	template = variables.parse(template, config.variables);
	
	return template;
}

function addHeader(template, item, data) {
	console.log('Adding header to ' + item);
	
	fs.writeFileSync(item, template + data);
}

function updateHeader(template, item, data) {
	console.log('Updating header in ' + item);
	
	data = data.replace(docBlockRegex, template);
	
	fs.writeFileSync(item, data);
}

function checkDocBlock(item, data, template) {
	var result = data.match(docBlockRegex);
	
	if (result && result[0] == template) {
		console.log('Skipped existing template file ' + item);
	} else if (result) {
		updateHeader(template, item, data);
	} else {
		addHeader(template, item, data);
	}
}

function updateFileList(files, config) {
	var template = parseTemplate(config);
	
	files.forEach(function(item) {
		template = template.replace(/\$\(file.abspath\)/gi, path.resolve('.', item).replace(/\\/g, '/'));
		template = template.replace(/\$\(file.relpath\)/gi, path.relative('.', item).replace(/\\/g, '/'));
		template = template.replace(/\$\(file.name\)/gi, path.basename(item));
		template = template.replace(/\$\(file.basename\)/gi, path.basename(item, path.extname(item)));
		template = template.replace(/\$\(file.ext\)/gi, path.extname(item));
		
		var data = fs.readFileSync(item).toString().replace(/^\s+/g, '');
		
		checkDocBlock(item, data, template);
	});
}

function shouldIgnore(patterns, file) {
	var regex;
	for (var i = 0; i < patterns.length; ++i) {
		regexp = new RegExp(patterns[i]);
		if (regexp.test(file)) {
			return true;
		}
	}
	return false;
}

function iterateFiles(dir, config) {
	var results = [];
	
	var items = fs.readdirSync(dir);
	items.forEach(function(item) {
		var file = dir + '/' + item;
		
		if (shouldIgnore(config.ignore, file)) {
			return;
		}
		
		var stat = fs.statSync(file);
		if (stat.isDirectory()) {
			results = results.concat(iterateFiles(file, config));
		} else if (stat.isFile()) {
			var ext = path.extname(file);
			
			if (config.extensions && config.extensions.indexOf(ext) == -1) {
				return;
			}
			
			results.push(file);
		}
	});
	
	return results;
}
