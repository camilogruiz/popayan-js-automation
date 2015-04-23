module.exports = function (grunt) {
    'use strict';
    /**
     * What version are we deploying?
     * @type {String}
     */
    var deployVersion = grunt.option('deployVersion') || '';

    // 1. Get all grunt plugins installed
    require('load-grunt-tasks')(grunt);

    // 2. Configurate Grunt
    grunt.initConfig({
        // Concat files
        concat: {
            options: {
                sourceMap: false
            },
            dev: {
                src: [
                    'app/scripts/popayan.js',
                    'app/scripts/**/*.js',
                    '!app/scripts/app.js' // Exclude app.js from concat
                ],
                dest: 'app/scripts/app.js',
            },
            prepareBuild: {
                src: [
                    'app/scripts/popayan.js',
                    'app/scripts/**/*.js',
                    '!app/scripts/app.js' // Exclude app.js from concat
                ],
                dest: '.tmp/scripts/app.js',
            }
        },
        // Compile *.scss files
        sass: {
            options: {
                sourceMap: false,
            },
            dev: {
                files: {
                    // Dest            // Source
                    'app/css/app.css': 'app/scss/app.scss'
                }
            },
            prepareBuild: {
                files: {
                    // Dest             // Source
                    '.tmp/css/app.css': 'app/scss/app.scss'
                }
            }
        },
        // Lint JS
        jshint: {
            options: {
                reporter: require('jshint-stylish'), // Use a custom reporter
                jshintrc: '.jshintrc' // What file to use
            },
            files: ['Gruntfile.js', 'app/scripts/**/*.js'] // What do we need to check
        },
        // Lint SCSS
        scsslint: {
            options: {
                config: '.scss-lint.yml', // Config for this project
                colorizeOutput: true // Make it good looking
            },
            dev: {
                src: ['app/scss/**/*.scss'] // What to check
            }
        },
        // Image Minification
        imagemin: {
            build: {
                files: {
                    // Dest                    // Source
                    'build/img/wallpaper.jpg': 'app/img/wallpaper.jpg'
                }
            }
        },
        // JS - Uglify
        uglify: {
            build: {
                options: {
                    sourceMap: false,
                },
                files: {
                    // Dest                     // Source
                    'build/scripts/app.min.js': '.tmp/scripts/app.js'
                }
            }
        },
        // CSS Minification
        cssmin: {
            build: {
                files: {
                    // Dest                  // Source
                    'build/css/app.min.css': '.tmp/css/app.css'
                }
            }
        },
        // GRUNT WATCH
        watch: {
            sass: {
                files: ['app/scss/**/*.scss'],
                tasks: ['scsslint', 'sass:dev']
            },
            scripts: {
                files: ['app/scripts/**/*.js', '!app/scripts/app.js'],
                tasks: ['jshint', 'concat:dev']
            }
        },
        // Server + Live Reload
        browserSync: {
            options: {
                browser: ['google chrome'],
                injectChanges: false
            },
            dev: {
                bsFiles: {
                    src: 'app/**/*.{js,css,html}'
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './app'
                    }
                }
            },
            build: {
                options: {
                    watchTask: false,
                    server: {
                        baseDir: './build'
                    }
                }
            }
        },
        // Clean directories
        clean: {
            prepare: ['.tmp'],
            build: ['build']
        },
        // Prepare HTML for the release
        processhtml: {
            build: {
                files: {
                    'build/index.html': 'app/index.html'
                }
            }
        },
        // BUMP VERSION + COMMIT
        bump: {
            options: {
                files: ['package.json'],
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['-a'], // Commit all files
                push: true,
                pushTo: 'origin'
            }
        }
    });

    // 3. Register tasks

    // DEVELOPMENT TASKS
    grunt.registerTask('quality', 'Quality check', [
        'jshint:dev',
        'scsslint'
    ]);

    grunt.registerTask('server', 'Start development web server', [
        'jshint', // Quality Check on *.js
        'scsslint', // Quality Check on *.scss
        'sass:dev', // Compile sass
        'concat:dev', // Concat all *.js files
        'browserSync:dev', // Start server
        'watch' // Watch for changes
    ]);

    // BUILD TASKS
    grunt.registerTask('prepare', 'Prepare everything for the build', [
        'clean:prepare', // Delete .tmp folder
        'clean:build', // Delete build folder
        'scsslint:dev', // Lint scss
        'jshint', // Lint js
        'sass:prepareBuild', // Compile sass into ./tpm
        'cssmin:build', // Minify .tmp/css/app.css -> build/css/app.min.css
        'concat:prepareBuild', // Concat *js files into build/app.min.js
        'uglify:build', // Uglify .tmp/scripts/app.js -> build/scripts/app.min.js
        'processhtml', // Transform HTML to prod
        'clean:prepare'
    ]);

    grunt.registerTask('testBuild', 'Test production build before release', ['browserSync:build']); // Check if the build works fine.

    grunt.registerTask('build', 'Create the build and commit changes', function () {
        grunt.task.run([
            'prepare', // Create the build
            'bump:' + deployVersion // Commit && push changes
        ]);
    });
};
