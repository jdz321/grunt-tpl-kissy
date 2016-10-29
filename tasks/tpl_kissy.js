/*
 * grunt-tpl-kissy
 * https://github.com/jdz321/grunt-tpl-kissy
 *
 * Copyright (c) 2016 石濑
 * Licensed under the MIT license.
 */

'use strict';

var htmlparser = require("htmlparser2");

var parseScript = function (dom) {
  var scriptObj = {};
  var scripts = dom.filter(function(d){
    return d.type === 'script' && d.attribs.id && d.attribs.type === 'text/template' && d.children.length === 1;
  });
  if(!scripts.length){
    return '';
  }
  scripts.forEach(function(s){
    scriptObj[s.attribs.id] = s.children[0].data.split('\n').map(function(l){
      return l.trim();
    }).filter(function(l){
      return l !== '';
    }).join();
  });
  return JSON.stringify(scriptObj);
  // var res = ''
};

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('tpl_kissy', 'create template kissy module from html', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({

    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join();

      var handler = new htmlparser.DomHandler(function (error, dom) {
        if (error) {
          grunt.log.error('SyntaxError: ' + f.src.join());
        } else {
          grunt.file.write(f.dest, parseScript(dom));
          grunt.log.writeln('File "' + f.dest + '" created.');
        }
      });

      var parser = new htmlparser.Parser(handler);

      parser.write(src);
      parser.done();

    });
  });

};
