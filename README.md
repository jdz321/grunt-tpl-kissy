# grunt-tpl-kissy

> create template kissy module from html

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
tnpm install grunt-tpl-kissy -D
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-tpl-kissy');
```

## The "tpl_kissy" task

### Overview
In your project's Gruntfile, add a section named `tpl_kissy` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  tpl_kissy: {
    options: {
      packageName: 'packageName'
    },
    files: [{
      expand: true,
      cwd: 'src/',
      src: '**/*-tpl.html',
      dest: 'src/',
      ext: '.js'
    }]
  },
});
```

### Options

#### options.packageName
Type: `String`
Default value: `""`
Current project name, as kissy module's prefix

```
KISSY.add('packageName/aaa-tpl',function () {})
```


### Usage Examples
Gruntfile.js
```
grunt.initConfig({
  tpl_kissy: {
    main: {
      options: {
        packageName: 'package-name'
      },
      files: [{
        expand: true,
        cwd: 'src/',
        src: '**/*-tpl.html',
        dest: 'src/',
        ext: '.js'
      }]
    }
  }
})

grunt.registerTask('default', ['tpl_kissy']);

```
aaa-tpl.html
```
<script id="aaa-aaa-1" type="text/template">
  haha aaa-1
</script>

<script id="aaa-2" type="text/template">
  <div class="haha">
    <span class="lala"></span>
  </div>
</script>
```
just run `$ grunt`

File "src/aaa-tpl.js" will be created. seems like
```
KISSY.add('grunt-tpl-kissy/aaa-tpl',function () {
  return {
    'aaaAaa1':'haha aaa-1',
    'aaa2':'<div class="haha"><span class="lala"></span></div>'
    }
  }
);
```

It can also work well with `grunt-contrib-watch`
Gruntfile.js
```
grunt.initConfig({
  watch: {
    tpl: {
      files: ['src/**/*-tpl.html'],
      tasks: ['tpl_kissy']
    }
  }
})
```
`grunt watch:tpl`, and then get free from `js template`,

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

