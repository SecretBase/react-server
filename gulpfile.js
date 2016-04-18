var gulp = require('gulp');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

gulp.task('dev', function () {

  livereload.listen();

  gulp.watch(['app/**/*.jade'], ['buildView']);
  gulp.watch([
    'source/app.js',
    'source/components/**/*.js',
    'source/reducers/**/*.js',
    'source/actions/**/*.js',
    'source/containers/**/*.js',
   ], ['buildClient']);

  nodemon({
    script: '',
    ext: 'js html jade',
    env: {
      'NODE_ENV': 'development',
      'PORT': '3000'
    },
    tasks: ['buildServer'],
    ignore: ['build/*', 'public/*', 'gulpfile.js', 'node_modules/*']
  }).on('restart', function () {
    console.log('Restarted Server.');
    gulp.src('.').pipe(livereload());
  });

});

gulp.task('buildView', function (event) {
  return gulp.src('source/**/*.jade').pipe(gulp.dest('build'));
});

gulp.task('buildServer', ['buildView'], function () {

  return gulp.src('source/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build'));

});

gulp.task('buildClient', function () {

  var bundleStream = browserify({
    entries: "./source/app.js",
    debug: true
  }).transform('babelify', {
    presets: ['es2015', 'react', 'stage-2']
  });

  bundleStream.bundle()
    .on('error', function (error) {
      console.log(error.toString());
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    // .pipe(sourcemaps.init({loadMaps: true}))
    // .pipe(uglify())
    // .pipe(concat('app.js'))
    // .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("public/javascripts"))
    .pipe(livereload());

});

gulp.task('build', ['buildView', 'buildServer', 'buildClient']);
