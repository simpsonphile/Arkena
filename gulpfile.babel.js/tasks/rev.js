import gulp from 'gulp'
import path from 'path'
import gulpRev from 'gulp-rev'
import gulpRevDel from 'gulp-rev-delete-original'
import config from '../config'

const paths = {
  desc: path.join(config.root.dist, config.root.dest)
}

const rev = () => {
  return gulp.src([path.join(paths.desc, '/**/*.css')])
    .pipe(gulpRev())
    .pipe(gulpRevDel())
    .pipe(gulp.dest(paths.desc))
    .pipe(gulpRev.manifest(path.join(paths.desc, 'manifest.json'), {
      merge: true
    }))
    .pipe(gulp.dest('./'))
}

gulp.task('rev', rev)
module.exports = rev
