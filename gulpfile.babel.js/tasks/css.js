import gulp from 'gulp'
import browserSync from 'browser-sync'
import path from 'path'
import cssnano from 'gulp-cssnano'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import combineMq from 'gulp-combine-mq'
import gulpif from 'gulp-if'
import handleErrors from '../lib/handle-errors'
import config from '../config'

const paths = {
  src: path.join(config.root.src, config.tasks.css.src, '/**/main.{' + config.tasks.css.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.css.dest)
}

const cssTask = () => {
  return gulp.src(paths.src)
    .pipe(sass(config.tasks.css.sass))
    .on('error', handleErrors)
    .pipe(combineMq({
      beautify: false
    }))
    .pipe(autoprefixer(config.tasks.css.autoprefixer))
    .pipe(gulpif(global.production, cssnano({ autoprefixer: false })))
    .pipe(gulp.dest(path.join(global.production ? config.root.dist : '', paths.dest)))
    .pipe(gulpif(!global.production, browserSync.stream()))
}

gulp.task('css', cssTask)
module.exports = cssTask
