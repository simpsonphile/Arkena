import gulp from 'gulp'
import path from 'path'
import browserSync from 'browser-sync'
import data from 'gulp-data'
import twig from 'gulp-twig'
import fs from 'fs'
import gulpif from 'gulp-if'
import config from '../config'
import handleErrors from '../lib/handle-errors'

const exclude = path.normalize('!**/{' + config.tasks.html.excludeFolders.join(',') + '}/**')

const paths = {
  src: [path.join(config.root.src, config.tasks.html.src, '/*.{' + config.tasks.html.extensions + '}'), exclude],
  dest: path.join('./')
}

const getData = function (file) {
  const dataPath = path.resolve(config.root.src, config.tasks.html.src, config.tasks.html.data)
  const fileName = dataPath + '/' + path.basename(file.path, '.twig') + '.json'

  if (fs.existsSync(fileName)) {
    return JSON.parse(fs.readFileSync(fileName, 'utf8'))
  }
}

const getDataOne = function (file) {
  const dataPath = path.resolve(config.root.src, config.tasks.html.src, config.tasks.html.dataFile)
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
}

var twigExtends = function (Twig) {
  /**
   * Tag "autoescape"
   * @output - content between tags
   */
  Twig.exports.extendTag({
    // unique name for tag type
    type: 'autoescape',
    // regex match for tag (autoescape white-space anything)
    regex: /^autoescape\s+(.+)$/,
    // this is a standalone tag and doesn't require a following tag
    next: ['endautoescape'],
    open: true,

    // Runs when the template is rendered
    parse: function (token, context, chain) {
      // parse the tokens into a value with the render context
      var output = Twig.parse.apply(this, [token.output, context])

      return {
        chain: false,
        output: output
      }
    }
  })

  // a matching end tag type
  Twig.exports.extendTag({
    type: 'endautoescape',
    regex: /^endautoescape$/,
    next: [ ],
    open: false
  })

  /**
   * Tag "load"
   * @output - empty
   */
  Twig.exports.extendTag({
    // unique name for tag type
    type: 'load',
    // regex match for tag (load white-space anything)
    regex: /^load\s+(.+)$/,
    // this is a standalone tag and doesn't require a following tag
    next: [ ],
    open: true,

    // runs on matched tokens when the template is loaded. (once per template)
    compile: function (token) {
      var expression = token.match[1]

      // Compile the expression. (turns the string into tokens)
      token.stack = Twig.expression.compile.apply(this, [{
        type: Twig.expression.type.expression,
        value: expression
      }]).stack

      delete token.match
      return token
    },

    // Runs when the template is rendered
    parse: function (token, context, chain) {
      var output = ''

      return {
        chain: false,
        output: output
      }
    }
  })

  /**
   * Tag "static"
   * @output - path to file
   */
  Twig.exports.extendTag({
    // unique name for tag type
    type: 'static',
    // regex match for tag (load white-space anything)
    regex: /^static\s+(.+)$/,
    // this is a standalone tag and doesn't require a following tag
    next: [ ],
    open: true,

    // runs on matched tokens when the template is loaded. (once per template)
    compile: function (token) {
      var expression = token.match[1]

      // Compile the expression. (turns the string into tokens)
      token.stack = Twig.expression.compile.apply(this, [{
        type: Twig.expression.type.expression,
        value: expression
      }]).stack

      delete token.match
      return token
    },

    // Runs when the template is rendered
    parse: function (token, context, chain) {
      var output = context.static + token.stack[0].value

      return {
        chain: false,
        output: output
      }
    }
  })

  /**
   * Tag "url"
   * @output - empty
   */
  Twig.exports.extendTag({
    // unique name for tag type
    type: 'url',
    // regex match for tag (load white-space anything)
    regex: /^url\s+(.+)$/,
    // this is a standalone tag and doesn't require a following tag
    next: [ ],
    open: true,

    // Runs when the template is rendered
    parse: function (token, context, chain) {
      var output = ''

      return {
        chain: false,
        output: output
      }
    }
  })

  /**
   * Tag "csrf_token"
   * @output - empty
   */
  Twig.exports.extendTag({
    // unique name for tag type
    type: 'csrf_token',
    // regex match for tag (csrf_token white-space anything)
    regex: /^csrf_token$/,
    // this is a standalone tag and doesn't require a following tag
    next: [ ],
    open: true,

    // Runs when the template is rendered
    parse: function (token, context, chain) {
      var output = ''

      return {
        chain: false,
        output: output
      }
    }
  })
};

const htmlTask = () => {
  return gulp.src(paths.src)
    .pipe(data(getDataOne))
    .pipe(data(getData))
    .on('error', handleErrors)
    .pipe(twig({
      extend: twigExtends
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(path.join(global.production ? config.root.dist : '', paths.dest)))
    .pipe(gulpif(!global.production, browserSync.stream()))
}

gulp.task('html', htmlTask)
module.exports = htmlTask
