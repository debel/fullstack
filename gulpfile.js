const gulp = require('gulp');
const libs = require('./gulp_tasks/libs');
const clear = require('./gulp_tasks/clear');
const topics = require('./gulp_tasks/topics');
const render = require('./gulp_tasks/render');
const buildAndDeploy = deployPath => () => {
    clear.clearOldDeploy(deployPath)
        .then(() => topics.extractTopicNames())
        .then(topics => {
            render.renderTopics(topics, deployPath);
            render.renderIndex(topics, deployPath);
            libs.buildJs(deployPath);
            libs.buildCss(deployPath);
            libs.copyImages(deployPath);
        }).catch(error => console.log(error));
};

gulp.task('build-reveal', buildAndDeploy('/usr/share/nginx/html/'));

gulp.task('build-home', buildAndDeploy('C:\\MixWay\\Web\\Fullstack\\'));

gulp.task('build-work', buildAndDeploy('C:\\Users\\mihailmikov\\HobbyProjects\\fullstack_local\\'));

gulp.task('default', ['build-reveal']);
