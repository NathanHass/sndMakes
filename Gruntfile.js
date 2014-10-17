/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({


    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    }

  });


  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.registerTask('refresh', ['compass']);

};
