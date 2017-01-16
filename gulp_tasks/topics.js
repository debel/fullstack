const fs = require('fs');
const gulp = require('gulp');
const tap = require('gulp-tap');
const gulpData = require('./data.json');

const mapValues = object => {
    if (typeof Object.values === 'function') {
        return Object.values(object);
    } else {
        return Object.keys(object).map(key => object[key]);
    }
}

const _trimPath = path => path.substr(path.lastIndexOf('topics') + 'topics'.length + 1);
const _trimTitle = path => {
    const linuxDelimiter = path.lastIndexOf('/');
    const windowsDelimiter = path.lastIndexOf('\\');
    return path.substr(0, linuxDelimiter > 0 ? linuxDelimiter : windowsDelimiter).trim();
};

const linkTo = (topic, title) => `<a href='/${topic}'>${(title || topic)}</a>`;
const listTopics = topics => `<ul id="all_topics">${(topics.reduce((acc, topic) => acc += `<li>${linkTo(topic)}</li>`, ''))}</ul>`;

const mapTopics = (topics) => {
    const values = mapValues(topics);
    const data = Object.create(null);
    data['topics_list'] = listTopics(values);
    data['topics_map'] = topics;

    const result = values.reduce(
        (result, topic) => {
            result[topic] = linkTo(topic);
            return result;
        },
        data);

    return result;    
};

const extractTopicNames = () => new Promise((y, n) => {
    const topics = Object.create(null);
    gulp.src(gulpData.paths.topics)
        .pipe(tap(file => topics[file.path] = (_trimTitle(_trimPath(file.path)))))
        .on('error', (error) => n(error))
        .on('end', () => {y(mapTopics(topics))});
});

module.exports = {
    extractTopicNames
};
