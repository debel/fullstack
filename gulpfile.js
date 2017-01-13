'use strict';

const gulp = require('gulp'),
  clean = require('gulp-clean'),
  helpers = require('./gulp_tasks/helpers'),
  path = require('path'),

  buildAndDeploy = deployPath => () => {
    helpers.getAllTopics().then(topics => {
      helpers.renderTopics(topics);
      helpers.renderIndex(topics);
      helpers.bundleLibs();
    });
  };

gulp.task('build-reveal', buildAndDeploy('/usr/share/nginx/html/'));

gulp.task('build-home', buildAndDeploy('C:\\MixWay\\Web\\Fullstack\\'));

gulp.task('build-work', buildAndDeploy('C:\\Users\\mihailmikov\\HobbyProjects\\fullstack_local\\'));

gulp.task('default', ['build-reveal']);
