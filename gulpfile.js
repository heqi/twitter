var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var bower = require('gulp-bower');
var sass = require('gulp-ruby-sass') ;

gulp.task('browserify', function() {
    gulp.src('src/js/main.js')
      .pipe(browserify({transform: 'reactify'}))
      .pipe(concat('main.js'))
      .pipe(gulp.dest('dist/js'));
});

gulp.task('bower', function() {
  bower().pipe(gulp.dest('dist/bower_components'))
});

gulp.task('copy', function() {
    gulp.src('src/index.html')
      .pipe(gulp.dest('dist'));
    gulp.src('src/assets/**/*.*')
      .pipe(gulp.dest('dist/assets'));
});

gulp.task('styles', function() {
  return sass('src/styles',{
      style: 'compressed',
      loadPath: [
        './src/styles',
        './src/bower_components' 
       ]
    }) 
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('default',['browserify', 'copy', 'bower', 'styles']);

gulp.task('watch', function() {
    gulp.watch('src/**/*.*', ['default']);
});
