import gulp from 'gulp'
import path from 'path'
import svgSprite from 'gulp-svg-sprite'
import config from '../config'

const configSvg = {
  mode: {
    symbol: true,
    sprite: 'sprite.<mode>.svg'
  }
}

const paths = {
  src: path.join(config.root.src, config.tasks.svgSprites.src),
  dest: path.join(config.root.dest, config.tasks.svgSprites.dest)
}

const svgSpritesTask = (cb) => {
  return gulp.src('**/*.svg', {
    cwd: paths.src
  })
    .pipe(svgSprite(configSvg))
    .pipe(gulp.dest(path.join(global.production ? config.root.dist : '', paths.dest)))
}

gulp.task('svgsprites', svgSpritesTask)
module.exports = svgSpritesTask
