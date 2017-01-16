const fs = require('fs');
const gulp = require('gulp');
const tap = require('gulp-tap');
const gulpData = require('./data.json');

const scaffoldData = JSON.parse(fs.readFileSync('./scaffold/data.json'));
const template = fs.readFileSync('./scaffold/template.html');

const _render = (view, data) => {
    return Object.keys(data).reduce(
        (result, key) => {
            const searchKey = new RegExp(`{{${key}}}`, 'g'),
                substituteValue = data[key];
            result = result.replace(searchKey, substituteValue);
            return result;
        },
        view
    );
}

const renderFiles = (files, extraData) => (topics, deployPath) => {
    extraData = extraData || {};
    return gulp.src(files).pipe(tap(file => {
        const data = Object.assign({}, topics, scaffoldData, extraData);
        delete data.topics_map;
        data['title'] = topics.topics_map[file.path] || 'Welcome';
       
        const fullPage = _render(
          template.toString(),
          { 'content': file.contents.toString() }
        );

        file.contents = new Buffer(_render(fullPage, data));
    })).pipe(gulp.dest(deployPath));
};

const renderTopics = renderFiles(gulpData.paths.topics, {
    titleSlide: scaffoldData.titleSlide
});
const renderIndex = renderFiles(gulpData.paths.index, {
    titleSlide: ''
});

module.exports = {
    renderTopics,
    renderIndex
};
