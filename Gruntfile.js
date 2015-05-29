module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({

    env: {
      build: {
        NODE_ENV: 'production'
      }
    },


    browserify: {
      dev: {
        options: {
          debug: true,
          transform: ['reactify']
        },
        files: {
          'public/js/bundle.js': 'public/js/app.jsx'
        }
      }
    },


    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "public/css/bundle.css": "public/less/main.less" // destination file and source file
        }
      }
    },
    watch: {
      styles: {
        files: ['public/less/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true,
          livereload: true
        }
      },
      htmls: {
        files: ['public/**/*.html'],
        options: {
          livereload:true
        }
      },
      react: {
        files: ['public/js/**/*.jsx', 'public/js/**/*.js','!public/js/bundle.js'], //exclude bundle file to watch
        tasks: ['browserify'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('default', ['less','browserify','watch']);
};