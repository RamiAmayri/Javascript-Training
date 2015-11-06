module.exports = function (grunt) {
    var config = {
        copy: {
            styles: {
                files: [
                    { src: ['<%= files.styles.src %>'], dest: '<%= files.styles.dest %>', expand: true, flatten: true }
                ]
            },
            views: {
                files: [
                    { src: ['<%= files.views.src %>'], dest: '<%= files.views.dest %>', expand: true, flatten: true }
                ]
            }
        },
        browserify: {
            options: {
                transform: [
                    ['babelify', { presets: ['es2015'] }]
                ]
            },
            dist: {
                files: [{ src: ['<%= files.scripts.src %>'], dest: '<%= files.scripts.dest %>', expand: true, flatten: true }]
            }
        },
        clean: {
            main: {
                src: '<%= files.dist %>'
            },
            scripts: {
                src: '<%= files.scripts.dest %>'
            },
            styles: {
                src: '<%= files.styles.dest %>'
            },
            views: {
                src: '<%= files.dist %>' + '**.html'
            }
        },
        watch: {
            copy_styles: {
                files: '<%= files.styles.src %>',
                tasks: ['clean:styles', 'copy:styles']
            },
            copy_views: {
                files: '<%= files.views.src %>',
                tasks: ['clean:views', 'copy:views']
            },
            browserify_dist: {
                files: '<%= files.scripts.src %>',
                tasks: ['clean:scripts', 'browserify:dist']
            }
        },
        server: {
            base: '<%= files.dist %>',
            web: {
                port: 1337
            }
        },
        files: {
            dist: 'dist/',
            scripts: {
                dest: '<%= files.dist %>' + 'scripts/',
                src: 'scripts/**.js'
            },
            styles: {
                dest: '<%= files.dist %>' + 'styles/',
                src: 'styles/**.css'
            },
            views : {
                dest: '<%= files.dist %>',
                src: 'views/**.html'
            }
        }
    }
    
    // Initializing Grunt config
    grunt.initConfig(config);
    
    // Loading local tasks in folder /tasks
    grunt.loadTasks('tasks');
    
    // Loading external tasks
    
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.loadNpmTasks('grunt-browserify');
    
    
    grunt.registerTask('default', ['clean:main', 'copy', 'browserify', 'server', 'watch'])
}