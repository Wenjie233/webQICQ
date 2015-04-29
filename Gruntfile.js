'use strict'
module.export = function(grunt){
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');

	require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfit({

    	pkg: grunt.file.readJSON('package.json'),

    	config: {
    		client:'client'
    	},

    	less: {
    		dev: {
    			option: {
    				compress: false,
    				yuicompress: false,
    			},
    			file: {
    				'<%=config.client%>/css/*.css': '<%=config.client%>/less/*.less'
    			}
    		}
    	},

    	watch: {
            less: {
                files: ['<%= config.client %>/less/*.less','<%= config.client %>/less/*/*.less'],
                tasks: ['less:dev'],
                options: {
                    debounceDelay: 250
                }
            }
        },
    })
}