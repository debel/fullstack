const fs = require('fs');
const tap = require('gulp-tap');
const concat = require('gulp-concat');
const gulpData = require('./data.json');
gulpData.paths.deploy = process.env.FS101_DEPLOY;

const scaffoldData = require('../scaffold/data.json');
const template = fs.readFileSync('../scaffold/template.html');

const clone = data => JSON.parse(JSON.stringify(data));
const _trimPath = path => path.substr(path.lastIndexOf('src') + 4);
const _trimTitle = path => {
    const linuxDelimiter = path.lastIndexOf('/');
    const windowsDelimiter = path.lastIndexOf('\\');
    return path.substr(0, linuxDelimiter > 0 ? linuxDelimiter : windowsDelimiter).trim();
};

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

const linkTo = (topic, title = topic) => `<a href='/${topic}'>${title}</a>`;
const listTopics = topics => `<ul id="all_topics">
  ${(topics.reduce((acc, topic) => acc += `<li>${linkTo(topic)}</li>`, ''))}</ul>`;

const mapTopics = (topics) => {
    const data = Object.create(null);
    data['topics_list'] = listTopics(topics);
    data['topics_array'] = topics;

    return topics.reduce(
        (result, topic) => {
            result[topic] = renderTopicLink(topic);
            return result;
        },
        data);
};

const extractAllTopics = () => new Promise((y, n) => {
    const topics = [];
    gulp.src(gulpData.topicsPath)
        .pipe(tap(file => topics.push(_trimTitle(_trimPath(file.path)))))
        .on('error', (error) => n(error))
        .on('end', () => y(mapTopics(topics)));
});

const renderFiles = (files, extraData = {}) => (topics) => {
gulp.src(files).pipe(tap(file => {
    const data = Object.assign({}, files, scaffoldData, extraData);
    data['title'] = _trimTitle(_trimPath(file.path));
    data['content'] = file.contents.toString();

    file.contents = new Buffer(_render(template.toString(), data));
})).pipe(gulp.dest(gulpData.paths.deploy));
});

const renderTopics = renderFiles(gulpData.paths.topics, {
    titleSlide: scaffoldData.titleSlide
});
const renderIndex = renderFiles(gulpData.paths.index, {
    titleSlide: ''
});

const bundleLibs = () => {
    gulp.src(gulpData.paths.js).pipe(concat('bundle.js')).pipe(gulp.dest(gulpData.paths.deploy + 'js' + path.sep)).on('error', err => console.log(err));
    gulp.src(gulpData.paths.css).pipe(concat('bundle.css')).pipe(gulp.dest(gulpData.paths.deploy + 'css' + path.sep)).on('error', err => console.log(err));
    gulp.src(gulpData.paths.images).pipe(gulp.dest(gulpData.paths.deploy + 'images' + path.sep)).on('error', err => console.log(err));
};

module.exports = {
    extractAllTopic,
    renderTopics,
    renderIndex,
    bundleLibs
};
