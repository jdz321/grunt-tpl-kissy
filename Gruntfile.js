/*
 * grunt-tpl-kissy
 * https://github.com/jdz321/grunt-tpl-kissy
 *
 * Copyright (c) 2016 石濑
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: { src: 'build/*' }
    },

    // Configuration to be run (and then tested).
    tpl_kissy: {
      main: {
        options: {
          packageName: '<%= pkg.name %>',
          prefix: 'xxx',
          pathDeep: 0
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: '**/*-tpl.html',
          dest: 'src/',
          ext: '.js'
        }]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

    watch: {
      tpl: {
        files: ['src/**/*-tpl.html'],
        tasks: ['tpl_kissy']
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'tpl_kissy' /**, 'nodeunit'**/ ]);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
