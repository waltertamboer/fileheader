var os = require('os');

function zerofy(value) {
	return value < 10 ? '0' + value : value;
}

function parseDateTime(data) {
	var date = new Date();
	
	data = data.replace(/\$\(date.full\)/gi, date);
	data = data.replace(/\$\(date.utc\)/gi, date.toUTCString());
	data = data.replace(/\$\(date.yyyy\)/gi, date.getFullYear());
	data = data.replace(/\$\(date.yy\)/gi, date.getFullYear() - 2000);
	data = data.replace(/\$\(date.mm\)/gi, zerofy(date.getMonth() + 1));
	data = data.replace(/\$\(date.m\)/gi, date.getMonth() + 1);
	data = data.replace(/\$\(date.dd\)/gi, zerofy(date.getDate()));
	data = data.replace(/\$\(date.d\)/gi, date.getDate());
	data = data.replace(/\$\(date.dayofweek\)/gi, date.getDay());
	data = data.replace(/\$\(date.hh\)/gi, zerofy(date.getHours()));
	data = data.replace(/\$\(date.h\)/gi, date.getHours());
	data = data.replace(/\$\(date.ii\)/gi, zerofy(date.getMinutes()));
	data = data.replace(/\$\(date.i\)/gi, date.getMinutes());
	data = data.replace(/\$\(date.ss\)/gi, zerofy(date.getSeconds()));
	data = data.replace(/\$\(date.s\)/gi, date.getSeconds());
	
	return data;
}

function parseCustom(data, customVariables) {
	if (customVariables) {
		var regexp;
		for (var variable in customVariables) {
			regex = new RegExp('\\$\\(' + variable + '\\)', 'g');
			
			data = data.replace(regex, customVariables[variable]);
		}
	}
	return data;
}

exports.parse = function(data, customVariables) {

	data = data.replace(/\$\(os.hostname\)/gi, os.hostname());
	data = data.replace(/\$\(os.platform\)/gi, os.platform());
	data = data.replace(/\$\(os.type\)/gi, os.type());
	data = data.replace(/\$\(os.arch\)/gi, os.arch());
	data = data.replace(/\$\(os.uptime\)/gi, os.uptime());

	data = parseDateTime(data);

	data = data.replace(/\$\(cwd\)/gi, process.cwd().replace(/\\/g, '/'));

	data = parseCustom(data, customVariables);
	
	return data;
};
