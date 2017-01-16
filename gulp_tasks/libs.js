const path = require('path');
const gulp = require('gulp');
const concat = require('gulp-concat');
const gulpData = require('./data.json');

const buildDeployPath = (deployPath, resource) => deployPath + resource + path.sep;
const buildJs = (deployPath) => gulp.src(gulpData.paths.js)
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest(buildDeployPath(deployPath, 'js')))
  .on('error', err => console.log(err));

const buildCss = (deployPath) => gulp.src(gulpData.paths.css)
  .pipe(concat('bundle.css'))
  .pipe(gulp.dest(buildDeployPath(deployPath, 'css')))
  .on('error', err => console.log(err));

const copyImages = (deployPath) => gulp.src(gulpData.paths.images)
  .pipe(gulp.dest(buildDeployPath(deployPath, 'images')))
  .on('error', err => console.log(err));

module.exports = {
  buildJs,
  buildCss,
  copyImages
};
