const gulp = require('gulp');
const libs = require('./gulp_tasks/libs');
const clear = require('./gulp_tasks/clear');
const topics = require('./gulp_tasks/topics');
const render = require('./gulp_tasks/render');

const buildAndDeploy = (deployPath, debug)  => () => {
    clear.clearOldDeploy(deployPath)
        .then(() => topics.extractTopicNames())
        .then(topics => {
            topics.DEBUG_MODE = !!debug;
            render.renderTopics(topics, deployPath);
            render.renderIndex(topics, deployPath);
            libs.buildJs(deployPath);
            libs.buildCss(deployPath);
            libs.copyImages(deployPath);
        }).catch(error => console.log(error));
};

gulp.task('build-reveal', buildAndDeploy('./docs/'));

gulp.task('build-home', buildAndDeploy('C:\\MixWay\\Web\\Fullstack\\', true));

gulp.task('build-work', buildAndDeploy('C:\\Users\\mihailmikov\\HobbyProjects\\fullstack_local\\', true));

gulp.task('default', ['build-reveal']);
