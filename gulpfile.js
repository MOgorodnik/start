"use strict";
var browserSync = require('browser-sync'); // Подключаем Browser Sync
var reload = browserSync.reload; //
var gulp = require('gulp'); // Подключаем Gulp
var sass = require('gulp-sass'); //Подключаем Sass пакет,


// SERVER CONFIG
var config = {
	server: {// Определяем параметры сервера
		baseDir: "src" // Директория для сервера
		// index: "index.html"
	},
	port: 9090,
    notify: false // Отключаем уведомления
};

// Basic Gulp task syntax
gulp.task('hi', function() {
	console.log('Hello Master!');
});

// WORKING START BROWSER-SYNC SERVER
//**********************************************************************
gulp.task('serve', function() {// Создаем таск serve
	bs(config); // Выполняем browser Sync
});


gulp.task('sass', function() {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', ['server', 'sass'], function() {
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/**/*.html', reload);
    gulp.watch('src/js/**/*.js', reload);
});

gulp.task('default', ['watch']);