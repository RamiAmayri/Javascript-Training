module.exports = function (grunt) {
	var config = {
		clean: {
			dist: {
				src: ['<%= files.dist %>']
			}
		},
		browserify: {
			options: {
				browserifyOptions: {
					debug: true
				},
				transform: [
					['babelify', { presets: ['es2015', 'react'], plugins: ['syntax-object-rest-spread'] }]
				]
			},
			scripts: {
				files: {
					'<%= files.scripts.bundle %>': ['<%= files.scripts.src %>']
				}
			}
		},
		eslint: {
			options: {
				configFile: '.eslintsrc.json'
			},
			target: ['<%= files.scripts.src %>']
		},
		copy: {
			indexHTML: {
				files: {
					'<%= files.dist %>': ['<%= files.indexHTML %>']
				}
			}	
		},
		connect: {
			server: {
				options: {
					livereload: true,
					open: true,
					port: '<%= web.port %>',
					base: {
						path: '<%= files.dist %>',
						options: {
							index: '<%= files.indexHTML %>'
						}
					}
				}
			}
		},
		watch: {
			options: {
				livereload: true	
			},
			scripts: {
				files: ['<%= files.scripts.src %>'],
				tasks: ['browserify:scripts']
			},
			indexHTML: {
				files: ['<%= files.indexHTML %>'],
				tasks: ['copy:indexHTML']
			}	
		},
		files: {
			dist: 'dist/',
			indexHTML: 'index.html',
			scripts: {
				src: 'scripts/**/*.js',
				dest: 'dist/scripts/',
				bundle: '<%= files.scripts.dest %>' + 'bundle.js'
			}
		},
		web: {
			port: 1337
		}
	}
	
	grunt.initConfig(config);
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-eslint');
	
	grunt.registerTask('default', ['clean', 'eslint', 'browserify', 'copy', 'connect', 'watch']);
};