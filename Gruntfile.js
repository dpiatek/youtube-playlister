/* jshint strict: false */

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'css/style.css': 'css/style.scss'
        }
      }
    },
    useminPrepare: {
      html: 'index.html'
    },
    usemin: {
      html: 'dist/index.html'
    },
    copy: {
      build: {
        dest: 'dist/index.html',
        src: 'index.html'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['sass']);
  grunt.registerTask('build', ['copy', 'useminPrepare', 'concat', 'uglify', 'usemin']);

};
