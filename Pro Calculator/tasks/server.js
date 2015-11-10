module.exports = function (grunt) {
    var express = require('express');
    
    grunt.registerTask('server', 'Static file development server', function () {
        var app, webPort, webRoot;

        webPort = grunt.config.get('server.web.port') || 1337;
        webRoot = grunt.config.get('server.base') || 'dist';

        app = express();
        app.use(express.static(process.cwd() + '/' + webRoot));
        app.listen(webPort);
    });
};
