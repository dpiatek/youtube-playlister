/* jshint strict: false */

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'app/css/style.css': 'app/css/style.scss'
        }
      }
    },
    useminPrepare: {
      html: 'app/index.html',
      options: {
        root: 'app'
      }
    },
    usemin: {
      html: 'dist/index.html'
    },
    copy: {
      index: {
        dest: 'dist/index.html',
        src: 'app/index.html'
      },
      apiKey: {
        src: 'app/js/yt_pl_key.js',
        dest: 'dist/js/yt_pl_key.js'
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['sass']);
  grunt.registerTask('build', ['copy', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'usemin']);

};
