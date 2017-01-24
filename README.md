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
      named: true,
      packageName: 'packageName',
      prefix: '',
      deep: 0
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

#### options.named
Type: `Boolean`
Default value: `true`
如果 `named` 被设置为 `false`,将输出匿名模块 

#### options.packageName
Type: `String`
Default value: `""`
作为模块的默认前缀， packageName 作为模块前缀时 `options.deep` 被视为 `1` 

```
KISSY.add('packageName/aaa-tpl',function () {})
```

#### options.prefix
Type: `String`
Default value: `""`
设置模块前缀，`prefix` 有值时，`options.packageName` 将被忽略

#### options.deep
Type: `Number`
Default value: `0`
设置模块名前缀的位置，例如：
```
src: src/widgets/deep/path/example-tpl.html
prefix: moduleName

KISSY.add('packageName/src/widgets/deep/path/example-tpl',function () {}) // deep = 0
KISSY.add('packageName/deep/path/example-tpl',function () {}) // deep = 2
```
deep大于src path的层级时，将输出匿名模块。

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
- 0.1.0 Initial Release
- 0.2.0 Support anonymous module and custom module prefix


