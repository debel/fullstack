const gulp = require('gulp');
const libs = require('./gulp_tasks/libs');
const clear = require('./gulp_tasks/clear');
const topics = require('./gulp_tasks/topics');
const render = require('./gulp_tasks/render');

const buildAndDeploy = (deployPath, linkPath, debug)  => () => {
    clear.clearOldDeploy(deployPath)
        .then(() => topics.extractTopicNames())
        .then(topics => {
            topics.DEBUG_MODE = !!debug;
            render.renderTopics(topics, deployPath, linkPath);
            render.renderIndex(topics, deployPath, linkPath);
            libs.buildJs(deployPath);
            libs.buildCss(deployPath);
            libs.copyImages(deployPath);
        }).catch(error => console.log(error));
};

gulp.task('build-github', buildAndDeploy('./docs/', '/fullstack'));

gulp.task('build-local', buildAndDeploy('./docs/', '/docs'));
