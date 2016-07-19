const fs = require('fs'),
  gulp = require('gulp'),
  tap = require('gulp-tap'),
  headerTemplate = fs.readFileSync('./templates/header-template.html'),
  footerTemplate = fs.readFileSync('./templates/footer-template.html'),
  deploymentMap = { local: '../Web/Fullstack/',
                    aws: '/usr/share/nginx/html/'},
  deployPath = deploymentMap[process.env.FULL_STACK_PATH || 'aws'];

gulp.task('build-reveal', () => {
  const css = [
      "./bower_components/reveal-js/css/reveal.min.css",
      "./bower_components/reveal-js/css/theme/night.css",
      "./bower_components/reveal-js/lib/css/zenburn.css"
    ],
    js = [
      "./bower_components/reveal-js/lib/js/head.min.js",
      "./bower_components/reveal-js/js/reveal.min.js",
      "./bower_components/reveal-js/plugin/highlight/highlight.js"
    ];

  gulp.src('./src/**/index.html')
    .pipe(tap(file => {
      const path = file.path.substr(file.path.indexOf('src') + 4),
        title = path.substr(0, path.indexOf('\\'));

      file.contents = Buffer.concat([
        new Buffer(headerTemplate.toString().replace('{{title}}', 'Full stack technologies: ' + title)),
        file.contents,
        footerTemplate
      ]);
    }))
    .pipe(gulp.dest(deployPath));

  gulp.src(js).pipe(gulp.dest(deployPath + 'js/'));
  gulp.src(css).pipe(gulp.dest(deployPath + 'css/'));
});
