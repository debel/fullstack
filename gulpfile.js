const fs = require('fs'),
      gulp = require('gulp'),
      tap = require('gulp-tap'),
      headerTemplate = fs.readFileSync('./templates/header-template.html'),
      footerTemplate = fs.readFileSync('./templates/footer-template.html');

gulp.task('build-reveal', () => {
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
              .pipe(gulp.dest('./build'));
});
