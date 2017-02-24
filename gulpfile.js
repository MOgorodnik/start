"use strict";
var browserSync = require('browser-sync').create(); // Подключаем Browser Sync
var reload = browserSync.reload; // var for short "browserSync.reload"
var gulp = require('gulp'); // Подключаем Gulp
var sass = require('gulp-sass'); //Подключаем Sass пакет
var wiredep = require('wiredep').stream;
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');


// SERVER CONFIG
var config = {
	server: {// server parameters
		baseDir: "src" // directory
		// index: "index.html"
	},
	port: 9090,
    notify: false // Отключаем уведомления
};

// Basic Gulp task syntax
gulp.task('hi', function() {
	console.log('Hello Master!');
});


// START BROWSER-SYNC SERVER
gulp.task('serve', function() {// Create task serve
    browserSync.init(config); // Init browser Sync
});

// MAX
gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.+(scss|sass)')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});
gulp.task('sass:watch', function () {
    gulp.watch('src/scss/**/*.scss', ['sass']);
});
gulp.task('sass:build', function () {
    return gulp.src('src/scss/**/*.+(scss|sass)')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'IE 11']
        }))
        .pipe(useref())
        // .pipe(cssnano())
        .pipe(gulpif('*.css', cssnano()))
        .pipe(gulp.dest('build/css'));
});


// BOWER INJECT CSS&JS ROUTE FROM PLUGINS
gulp.task('bower', function () {
    gulp.src('src/index.html')
        .pipe(wiredep())
        .pipe(gulp.dest('src'))
});
gulp.task('bower:watch', function() {
    gulp.watch('bower.json', ['bower']);
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});


// DIMA
// gulp.task('watch', ['serve', 'sass'], function() {
//     gulp.watch('src/sass/**/*.scss', ['sass']);
//     gulp.watch('src/**/*.html', reload);
//     gulp.watch('src/js/**/*.js', reload);
//     gulp.watch('bower.json', ['bower']);
// });
//
// gulp.task('default', ['watch']);

//  MAX
gulp.task('watch', ['serve', 'bower', 'sass'], function () {
    gulp.watch("src/scss/*.scss", ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch('bower.json', ['bower']);
    gulp.watch("src/js/*.js").on('change', browserSync.reload);
});

gulp.task('default', ['watch']);