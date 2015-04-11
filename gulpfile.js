var gulp = require('gulp'),
  spritesmith = require('gulp.spritesmith'),
  imagemin = require('gulp-imagemin'),
  csso = require('gulp-csso'),
  replace = require('gulp-replace'),
  coffeelint = require('gulp-coffeelint'),
  jshint = require('gulp-jshint'),
  sass = require('gulp-sass');

gulp.task('default',['sprite']);

// Sprite task
gulp.task('sprite', function () {
  var spriteConfig = {
      imgName: 'icons-sprite.png',
      cssName: 'icons-sprite.css'
    },
    spriteData = gulp.src('src/static/img/icons/*').pipe(spritesmith(spriteConfig));

  // Let's optimize images
  spriteData.img
    .pipe(imagemin())
    .pipe(gulp.dest('src/static/img/'));

  // Let's optimize css
  spriteData.css
    .pipe(csso())
    .pipe(replace(/url\(\S+\)/g, 'url("../../img/icons-sprite.png")'))
    .pipe(gulp.dest('src/static/styles/css/'));
});

// sass
gulp.task('sass', function () {
  gulp.src('src/static/styles/scss/main.scss')
    .pipe(sass({errLogToConsole: true}))
    .pipe(gulp.dest('src/static/styles/css/'));
});

// watch
gulp.task('watch', function() {
  gulp.watch('src/static/styles/scss/**/*.scss', ['sass']);
});

// Let's lint our js
gulp.task('js-lint', function() {
  gulp.src('app/assets/javascripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter());
});
