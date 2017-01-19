const fs = require('fs');
const gulp = require('gulp');
const tap = require('gulp-tap');
const gulpData = require('./data.json');

const scaffoldData = JSON.parse(fs.readFileSync('./scaffold/data.json'));

const mainTemplate = fs.readFileSync('./scaffold/template.html');
const scheduleTemplate = fs.readFileSync('./scaffold/schedule.html');

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

const renderSchedule = topics => _render(scheduleTemplate.toString(), Object.assign({}, scaffoldData, topics));

const renderFiles = (files, extraData) => (topics, deployPath) => {
    topics.topics_map.toString = () => '';
    const schedule = renderSchedule(topics);
    extraData = extraData || {};
    return gulp.src(files).pipe(tap(file => {
        const data = Object.assign({}, topics, scaffoldData, extraData);
        data['title'] = topics.topics_map[file.path] || 'Welcome';
        data['schedule'] = schedule;

        const fullPage = _render(
          mainTemplate.toString(),
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
