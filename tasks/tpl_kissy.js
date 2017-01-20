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
    return scriptObj;
  }
  scripts.forEach(function(s){
    scriptObj[s.attribs.id] = s.children[0].data.split('\n').map(function(l){
      return l.trim();
    }).filter(function(l){
      return l !== '';
    }).join('');
  });
  return scriptObj;
};

var toCamelCase = function(s){
  return s.replace(/-\w/g, function(v){
    return v.replace('-', '').toUpperCase();
  });
};

var parseScriptObj = function(scriptObj){
  var arr = [], script;
  for(var key in scriptObj){
    script = '';
    script += '\'' + toCamelCase(key) + '\':';
    script += '\'' + scriptObj[key] + '\'';
    arr.push(script);
  }
  return arr.join(',');
};

var wrapScript = function(scriptObj, src, pkg){
  var script = 'KISSY.add(\'' + src.replace(/^src/, pkg).replace(/.html$/, '') + '\',function () {';
  script += 'return {';
  script += parseScriptObj(scriptObj);
  script += '}';
  script += '});';
  return script;
};

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('tpl_kissy', 'create template kissy module from html', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      packageName: ''
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
          // grunt.file.write(f.dest, parseScript(dom));
          var scriptObj = parseScript(dom);
          var script = wrapScript(scriptObj, f.src.join(), options.packageName);

          grunt.file.write(f.dest, script);
          grunt.log.writeln('File "' + f.dest + '" created.');
        }
      });

      var parser = new htmlparser.Parser(handler);

      parser.write(src);
      parser.done();

    });
  });

};
