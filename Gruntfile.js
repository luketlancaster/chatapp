'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    clean: {
      temp: ['.tmp'],
      dist: ['public']
    },

    copy: {
      main: {
        files: [
          {expand: true,
            cwd: 'app/',
            src: [
              '**',
              '!**/*.jade',
              '!**/*.{scss,sass}'
            ],
            dest: 'public/',
            filter: 'isFile'
          }
        ]
      }
    },

    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [{expand: true, cwd: 'app/', src: ['**/*.jade', '!**/_*.jade'], dest: 'public/', ext: '.html'}]
      }
    },

    concat: {
      iife: {
        options: {
          banner: ';(function(){',
          footer: '}());'
        },
        src: ['public/js/main.min.js'],
        dest: 'public/js/main.min.js'
      }
    },

    connect: {
      options: {
        port: 8888,
        open: true,
        useAvailablePort: true,
        hostname: 'localhost'
      },

     server: {
      options: {
        livereload: true,
        middleware: function(connect) {
          return [
            connect.static('public'),
            connect().use('/scripts', connect.static('./app/scripts')),
            connect().use('/bower_components', connect.static('./bower_components'))
            ];
          }
        }
      }
    },

    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'public/css/main.css': 'app/styles/main.scss'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['> 1% in US']
      },
      build: {
        src: 'public/css/**.css'
      }
    },

    usemin: {
      html: ['public/index.html']
    },

    useminPrepare: {
      html: ['public/index.html'],

      options: {
        dest: 'public',
        root: 'app'
      }
    },

    watch: {
      livereload: {
        options: {
          livereload: true
        },
        files: [
          'public/**/*.html',
          'public/css/**/*.css',
          'public/js/**/*.js',
          'app/scripts/**/*.js'
        ]
      },
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      other: {
        files: ['app/**', '!app/**/*.jade', '!app/**/*.{sass,scss}'],
        tasks: ['copy']
      },
      jade: {
        files: ['app/**.jade'],
        tasks: ['jade']
      },
      sass: {
        files: ['app/**/*.{sass,scss}'],
        tasks: ['sass', 'autoprefixer']
      }
    },

    wiredep: {
      build: {
        src: ['public/**/*.html']
      }
    }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('build', ['setup','combineJs']);
  grunt.registerTask('serve', ['setup','connect','watch']);
  grunt.registerTask('setup', [
    'clean',
    'copy',
    'jade',
    'sass',
    'autoprefixer',
    'wiredep'
  ]);
  grunt.registerTask('combineJs', [
    'clean:temp',
    'useminPrepare',
    'concat:generated',
    'uglify:generated',
    'usemin',
    'concat:iife',
    'clean:temp'
  ]);
};


