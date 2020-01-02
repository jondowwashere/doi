// Definitions
const browsersync = require('browser-sync');
const server = browsersync.create();
const beautify = require('gulp-beautify');
const del = require('del');
const gulp = require('gulp');
const htmlmin = require('htmlmin');
const pug = require('gulp-pug');
const uglify = require('gulp-uglify');
const minifycss = require('gulp-minify-css');
const sass = require('gulp-sass');

// Gulp
function clean(done) {
  del('./dest/*');
  done();
}
function serve(done) {
  server.init({
    server: {
      baseDir: './dest/'
    }
  });
  done();
}
function reload(done) {
  server.reload();
  done();
}
function watch() {
  gulp.watch('./src/pug/**', gulp.series(pugTask, reload));
  gulp.watch('./src/sass/**', gulp.series(sassTask, reload));
}

// Tasks
function addLibraries(done) {
  // FontAwesome
//  gulp.src('./src/libs/fontawesome/*')
//    .pipe(gulp.dest('./dest/libs/fontawesome/'));
  // Bootstrap
  gulp.src('./src/libs/bootstrap/bootstrap.css')
    .pipe(minifycss())
    .pipe(gulp.dest('./dest/css/'));
  gulp.src('./src/libs/bootstrap/bootstrap.bundle.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dest/js/'));
  // jQuery
  gulp.src('./src/libs/jquery/jquery.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dest/js/'));
  // Popper
  gulp.src('./src/libs/popper/popper.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dest/js/'));
  done();
}
function minifyer(done) {
  // html
  gulp.src('./dest/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dest/'));
  // css
  gulp.src('./dest/*.css')
    .pipe(minifycss)
    .pipe(gulp.dest('./dest/'));
  // js
  gulp.src('./dest/*.js')
    .pipe(uglify)
    .pipe(gulp.dest('./dest/'));
  done();
}
function beautifyer(done) {
  // html
  gulp.src('./dest/*.html')
    .pipe(beautify.html({ indent_size: 2 }))
    .pipe(gulp.dest('./dest/'));
  // css
  gulp.src('./dest/*.css')
    .pipe(beautify.css({ indent_size: 2 }))
    .pipe(gulp.dest('./dest/'));
  // js
  gulp.src('./dest/*.js')
    .pipe(beautify.js({ indent_size: 2 }))
    .pipe(gulp.dest('./dest/'));
  done();
}
function pugTask(done) {
  gulp.src('./src/pug/dash.pug')
    .pipe(pug())
  .pipe(gulp.dest('./dest/'));
  done();
}
function sassTask(done) {
  gulp.src('./src/sass/styles.sass')
    .pipe(sass())
  .pipe(gulp.dest('./dest/'));
  done();
}

// Exports
const build = gulp.series(addLibraries, pugTask, sassTask, serve, watch);
exports.default = build;
exports.addLibraries = addLibraries;
exports.clean = clean;
exports.beautifyer = beautifyer;
exports.minifyer = minifyer;
exports.pug = pugTask;
