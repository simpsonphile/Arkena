import path from 'path'
import gulp from 'gulp'
import config from '../config'

const watchTask = () => {
  const watchableTasks = ['css', 'html', 'images', 'fonts']

  watchableTasks.forEach((taskName) => {
    const task = config.tasks[taskName]
    if (task) {
      let glob = path.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}')
      gulp.watch(glob, gulp.parallel(taskName))
    }
  })
}

gulp.task('watch', watchTask)
module.exports = watchTask
