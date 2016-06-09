module.exports = function(grunt) {

  // Project configuration.
	grunt.initConfig({

		  openui5_preload: {
		    component: {
		        options: {
		          resources: {
		            cwd: '../www/apps/demoapp/',
		            prefix: 'ui5strap/demoapp',
		            src : [
		             '**/*.js',
		             '**/*.fragment.html',
		             '**/*.fragment.json',
		             '**/*.fragment.xml',
		             '**/*.view.html',
		             '**/*.view.json',
		             '**/*.view.xml',
		             '**/*.properties',
		             
		             '**/*.action.json',
		             
		             '!Component-preload.js'
		            ]
		          },
		          dest: '../www/apps/demoapp/'
		        },
		        components: 'ui5strap/demoapp'
		      }
		  }

		});
	
	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-openui5');

	  // Default task(s).
	  grunt.registerTask('default', ['openui5_preload']);
};