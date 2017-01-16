const gulp = require('gulp');
const clean = require('gulp-clean');

const clearOldDeploy = (deployPath) => new Promise((y, n) => {
  gulp.src(deployPath + '*').pipe(clean({force: true}))
    .on('error', error => n(error))
    .on('end', () => {console.log('clear');y();})
    setTimeout(y, 500);
  });


module.exports = {
  clearOldDeploy
}
