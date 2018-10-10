module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    ts: {
      themeDefault: {
        options: {
          sourceMap: false,
          module: 'amd',
          basePath: 'themes',
          declaration: false
        },
        src: [
          'src/assets/js/src/lib/**/*.ts',
          'src/assets/js/src/typedoc/Application.ts',
          'src/assets/js/src/typedoc/components/**/*.ts',
          'src/assets/js/src/typedoc/services/**/*.ts',
          'src/assets/js/src/typedoc/utils/**/*.ts',
          'src/assets/js/src/~bootstrap.ts'
        ],
        out: 'src/assets/js/main.js'
      }
    },
    uglify: {
      themeDefault: {
        options: {
          mangle: false
        },
        files: {
          'bin/assets/js/main.js': [
            'src/assets/js/lib/jquery-2.1.1.min.js',
            'src/assets/js/lib/underscore-1.6.0.min.js',
            'src/assets/js/lib/backbone-1.1.2.min.js',
            'src/assets/js/lib/lunr.min.js',
            'src/assets/js/main.js'
          ]
        }
      }
    },
    sass: {
      options: {
        style: 'compact',
        unixNewlines: true
      },
      themeDefault: {
        files: [{
          expand: true,
          cwd: 'src/assets/css',
          src: '**/*.sass',
          dest: 'bin/assets/css',
          ext: '.css'
        }]
      }
    },
    autoprefixer: {
      options: {
        cascade: false
      },
      themeDefault: {
        expand: true,
        src: 'bin/**/*.css',
        dest: './'
      }
    },
    copy: {
      plugin: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['*.js'],
          dest: 'bin'
        }]
      },
      themeDefault: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.hbs', '**/*.png'],
          dest: 'bin'
        }]
      }
    },
    watch: {
      js: {
        files: ['src/assets/js/src/**/*.ts'],
        tasks: ['js']
      },
      css: {
        files: ['src/assets/css/**/*'],
        tasks: ['css']
      },
      default: {
        files: ['src/**/*.hbs'],
        tasks: ['copy']
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-autoprefixer')
  grunt.loadNpmTasks('grunt-ts')

  grunt.registerTask('css', ['sass', 'autoprefixer'])
  grunt.registerTask('js', ['ts:themeDefault', 'uglify'])
  grunt.registerTask('default', ['copy', 'css', 'js'])
}

