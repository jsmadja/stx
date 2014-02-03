module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.initConfig({
    connect: {
      root: {
        options: {
          keepalive: true
        }
      }
    }
  });

  grunt.registerTask('default', ['build', 'examples']);
  grunt.registerTask('build', ['clean', 'concat', 'umd', 'uglify']);

};
