'use strict';

const gulp = require('gulp'),
  clean = require('gulp-clean'),
  helpers = require('./gulpHelpers'),
  path = require('path'),
  data = helpers.commonData,

  buildAndDeploy = deployPath => () => {
    const modules = [];

      gulp.src('./src/*/index.html')
        .pipe(helpers.extractModuleNames(modules)).on('end', () => {
          gulp.src('./src/index.html')
            .pipe(helpers.wrapModule(modules))
            .pipe(gulp.dest(deployPath));

          gulp.src('./src/*/index.html')
            .pipe(helpers.wrapModule(modules, data.titleHeading, data.homeLink))
            .pipe(gulp.dest(deployPath));

        }).on('error', err => console.log(err));

      gulp.src(data.js_libs).pipe(gulp.dest(deployPath + 'js' + path.sep)).on('error', err => console.log(err));
      gulp.src(data.css_libs).pipe(gulp.dest(deployPath + 'css' + path.sep)).on('error', err => console.log(err));
      gulp.src(data.images).pipe(gulp.dest(deployPath + 'images' + path.sep)).on('error', err => console.log(err));
  };

gulp.task('build-reveal', buildAndDeploy('/usr/share/nginx/html/'));

gulp.task('build-home', buildAndDeploy('C:\\MixWay\\Web\\Fullstack\\'));

gulp.task('build-work', buildAndDeploy('C:\\Users\\mihailmikov\\HobbyProjects\\fullstack_local\\'));

gulp.task('default', ['build-reveal']);
