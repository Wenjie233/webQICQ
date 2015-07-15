'ues strict'
module.exports = function (grunt) {
    require('time-grunt')(grunt);

    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        config: {
            lib: 'app/bower_components',
            app: 'app',
            client: 'client',
            scripts: 'app/scripts'
        },
        concat: {
            js: {
                src: ['<%= config.lib %>/zepto/zepto.min.js',
                        '<%= config.lib %>/angular/angular.min.js',
                        '<%= config.lib %>/angular-ui-router/release/angular-ui-router.min.js',
                        '<%= config.lib %>/angular-cookie/angular-cookie.min.js',
                        '<%= config.lib %>/angular-loading-bar/build/loading-bar.js',
                        '<%= config.lib %>/md5.js',
                        '<%= config.lib %>/jweixin-1.0.0.js',
                        '<%= config.scripts %>/app.js',
                        '<%= config.scripts %>/controllers.js',
                        '<%= config.scripts %>/parkDetailModule.js',
                        '<%= config.scripts %>/walletModule.js',
                        '<%= config.scripts %>/parkManegeModule.js',
                        '<%= config.scripts %>/signupModule.js',
                        '<%= config.scripts %>/timesetModule.js',
                        '<%= config.scripts %>/addParkDetailModule.js',
                        '<%= config.scripts %>/bookParkingModule.js',
                        '<%= config.scripts %>/rechargeModule.js',
                        '<%= config.scripts %>/filters.js',
                        '<%= config.scripts %>/services.js',
                        '<%= config.scripts %>/loadingModule.js',
                        '<%= config.scripts %>/dialog.js',
                        ],
                dest: "app/scripts/release/main.js"
            },
            css: {
                src: [  '<%= config.client%>/styles/all.css', 
                        '<%= config.lib %>/angular-loading-bar/build/loading-bar.css',
                        '<%= config.client%>/styles/wj-dialog.css'
                        ],
                dest: 'app/styles/style.css'
            }

        },
        less: {
            dev: {
                options: {
                    compress: false,
                    yuicompress: false
                },
                files: {
                    '<%= config.client%>/css/main.css': '<%= config.client%>/less/main.less',
                }

            }
        },
        watch: {
            js: {
                files: ['<%= config.scripts %>/*.js'],
                tasks: ['concat:js', 'uglify'],
                options: {
                    debounceDelay: 250
                }
            },
            less: {
                files: ['<%= config.client %>/less/*.less','<%= config.client %>/less/*/*.less'],
                tasks: ['less:dev'],
                options: {
                    debounceDelay: 250
                }
            }
        },
        cssmin: {
            css: {
                src: 'app/styles/style.css',
                dest: 'app/styles/style.min.css'
            }
        },
        uglify: {
            build: {
                src: 'app/scripts/release/main.js',
                dest: 'app/scripts/release/main.min.js'
            
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.registerTask('default', ['concat:js', 'uglify', 'concat:css', 'cssmin']);
    grunt.registerTask('watchall', ['watch:js', 'watch:less']);

    

}