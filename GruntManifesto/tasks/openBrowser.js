module.exports = function (grunt) {
	var open = require('open');
	
	grunt.registerTask('openBrowser', 'Opening browser with give url and port after server runs', function () {
		var baseUrl = grunt.config.get('openBrowser.baseUrl') || 'localhost';
		var port = grunt.config.get('openBrowser.port') || 1337; 
	
		open('http:\\' + baseUrl + ':' + port);
	});
};