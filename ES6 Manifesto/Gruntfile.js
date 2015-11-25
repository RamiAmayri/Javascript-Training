module.exports = function (grunt) {
	grunt.initConfig({
		clean: {
			indexHTML: {
				src: ['<%= files.dist.indexHTML %>']
			},
			bundleJS: {
				src: ['<%= files.dist.bundleJS %>']
			}
		},
		copy: {
			dist: {
				files: [
					{ expand: true, flatten: true, dest: '<%= files.dist.root %>', src: ['<%= files.src.indexHTML %>'] }
				]
			}
		},
		eslint: {
			options: {
				configFile: 'eslint.json'
			},
			target: ['<%= files.src.scripts %>']
		},
		browserify: {
			options: {
				browserifyOptions: {
					debug: true
				},
				transform: [
					['babelify', { presets: ['es2015'], plugins: ['syntax-object-rest-spread'] }]
				]
			},
			dist: {
				files: {
					'<%= files.dist.bundleJS %>': ['<%= files.src.scripts %>']
				}
			}
		},
		connect: {
			server: {
				options: {
					port: '<%= web.port %>',
					hostname: '<%= web.host %>',
					base: '<%= files.dist.root %>',
					livereload: true,
					open: true
				}
			}
		},
		watch: {
			options: {
				livereload: true
			},
			indexHTML: {
				files: ['<%= files.src.indexHTML %>'],
				tasks: ['clean:indexHTML', 'copy']
			},
			scripts: {
				files: ['<%= files.src.scripts %>'],
				tasks: ['clean:bundleJS', 'browserify']
			}
		},
		web: {
			host: 'localhost',
			port: 1337,
			'debug-port': 1338
		},
		files: {
			src: {
				root: 'src/',
				scripts: '<%= files.src.root %>' + '**.js',
				indexHTML: '<%= files.src.root %>' + 'index.html'
			},
			dist: {
				root: 'dist/',
				bundleJS: '<%= files.dist.root %>' + 'bundle.js',
				indexHTML: '<%= files.dist.root %>' + 'index.html'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-eslint');

	// Debugg how to:
	// 1. Run node-inspector 
	// 2. Run node --debug-brk C:\Users\ramarai\AppData\Roaming\npm\node_modules\grunt-cli\bin\grunt
	// 3. Browse http://127.0.0.1:8080/?ws=127.0.0.1:8080&port=5858
	
	grunt.registerTask('default', ['clean', 'copy', 'eslint', 'browserify', 'connect', 'watch']);
};