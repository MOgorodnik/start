"use strict";
var bs = require('browser-sync'); // Подключаем Browser Sync
//var del = require('del'); // Подключаем библиотеку для удаления файлов и папок
var gulp = require('gulp'); // Подключаем Gulp
//var autoprefixer = require('gulp-autoprefixer'); // Подключаем библиотеку для автоматического добавления префиксов
//var cache = require('gulp-cache'); // Подключаем библиотеку кеширования
//var cssnano = require('gulp-cssnano'); // Подключаем пакет для минификации CSS

//var cleanCSS = require('gulp-clean-css');// Подключаем пакет для минификации CSS
//var gulpIf = require('gulp-if');
//var imagemin = require('gulp-imagemin');// Подключаем библиотеку для работы с изображениями
//var newer = require('gulp-newer');// Подключаем для проверки был ли изменен файл/папка перед выполнением таска/плагина
var sass = require('gulp-sass'); //Подключаем Sass пакет,
//var sourcemaps = require('gulp-sourcemaps');
//var uglify = require('gulp-uglify'); // Подключаем gulp-uglify (для сжатия JS)
//var useref = require('gulp-useref');
//var pngquant     = require('imagemin-pngquant'); // Подключаем библиотеку для работы с png
//var runSequence = require('run-sequence');
//var wiredep = require('wiredep').stream;
//var debug = require('gulp-debug'); //Плагин для дебага

	//var concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	//var rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов


// PATH
var path = {
	built: { // Пути куда складывать собранные файлы
		html: 'built',
		js: 'built/js',
		style: 'built/css',
		img: 'built/img',
		fonts: 'built/fonts'
	},
	src: { //Пути откуда брать исходники
		html: ['src/*.+(html|htm)'], //'src/*.html', //Синтаксис src/*.html говорит gulp что мы берем все файлы с расширением .html
		js: ['src/js/**/*.js'], //'src/js/main.js',// Находим и берем все js файлы
		style: ['src/sass/*.{sass,scss}'], //'src/style/main.scss',
		img: 'src/img/**/*.{png,jpg,jpeg,gif,svg}', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
		fonts: ['src/bower_components/bootstrap/fonts/*.*', 'src/bower_components/font-awesome/fonts/*.*', 'src/font/*.*', 'src/bower_components/slick-carousel/slick/fonts/*.*' ],
		//fonts: ['src/fonts/*.*', 'src/font/*.*'],
		jade   : ['src/**/*.jade'],
		libs: 'src/libs/'
	},
	watch: { // Указываем, за изменением каких файлов мы должны наблюдать
		html: 'src/**/*.{html,htm}',
		js: 'src/js/**/*.js',
		style: 'src/style/**/*.{sass,scss}',
		img: 'src/images/**/*.{png,jpg,jpeg,gif,svg}',
		fonts: ['src/fonts/**/*.*', 'src/font/**/*.*']
	},
	clean: 'built/'
};
// SERVER CONFIG
var config = {
	server: {
		baseDir: "built"
		// index: "index.html"
	},
	port: 9090
	// routes:{
	//	   "path to folder"
	// }
	// tunnel: true,
	// host: 'localhost',
	// logPrefix: "Frontend_MO"
};

// Basic Gulp task syntax
gulp.task('hi', function() {
	console.log('Hello Master!');
});

// WORKING START BROWSER-SYNC SERVER
//**********************************************************************
gulp.task('bs', function() {
	bs(config)
});
// WORKING SASS TASK
//**********************************************************************
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
gulp.task('sass', function () {// Создаем таск Sass
	return gulp.src(path.src.style)
		.pipe(gulpIf(isDevelopment, sourcemaps.init()))
		.pipe(sass())
		.pipe(autoprefixer(['last 5 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulpIf(isDevelopment, sourcemaps.write()))
		.pipe(gulp.dest(path.built.style))
		.pipe(bs.reload({stream:true}));
});
//**********************************************************************
// CSS-Tricks
//--------------------------
// gulp.task('sass', function() {
// 	return gulp.src(path.src.style) // Gets all files ending with .scss in app/scss and children dirs
// 		.pipe(sass()) // Passes it through a gulp-sass
// 		.pipe(gulp.dest('app/css')) // Outputs it in the css folder
// 		.pipe(bs.reload({stream: true}));// Reloading with Browser Sync
// });
// webdesign-master.ru - agragregra/gulp-lesson
//---------------------------
// gulp.task('sass', function(){ // Создаем таск Sass
// 	return gulp.src('app/sass/**/*.sass') // Берем источник
// 		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
// 		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
// 		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
// 		.pipe(bs.reload({stream: true})); // Обновляем CSS на странице при изменении
// });
//Ilya Kantor - gulp-screencast
//---------------------------
// const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
// gulp.task('styles', function() {
//
// 	return gulp.src('frontend/styles/main.styl')
// 		.pipe(gulpIf(isDevelopment, sourcemaps.init()))
// 		.pipe(stylus())
// 		.pipe(gulpIf(isDevelopment, sourcemaps.write()))
// 		.pipe(gulp.dest('public'));
// });


// WORKING CLEAN TASK
//***********************************************************{base: 'bower_components/'}
gulp.task('clean', function () {
	return del.sync(path.clean);//.then(function (cb) {
		//return cache.cllearAll(cb);
	//})
});
gulp.task('clean:public', function(cb) {
	console.log(path.clean);
	// return del.sync([path.clean+'**/*', '!'+path.built.img, '!'+path.built.img+'**/*']); // mistake in path "**/*' !== "/**/*"
	return del.sync([path.clean+'/**/*', '!'+path.built.img, '!'+path.built.img+'/**/*']);
	// return del.sync(['built/**/*', '!built/img', '!built/img/**/*']);
});
// **********************************************************************
// CSS-Tricks
//--------------------------
// Cleaning
// gulp.task('clean', function() {
// 	return del.sync(path.built.html).then(function(callback) {
// 		return cache.clearAll(callback);
// 	});
// });
// gulp.task('clean:built', function() {
// 	return del.sync(['built/**/*', '!built/img', '!built/img/**/*']);
// 	// return del.sync([path.built.html, !path.built.img, !path.built.img + '/!**/!*']);
// });
// webdesign-master.ru - agragregra/gulp-lesson
//---------------------------
// gulp.task('clean', function() {
// 	return del.sync(path.built.html); // Удаляем папку dist перед сборкой
// });
//Ilya Kantor - gulp-screencast
//---------------------------
// gulp.task('clean', function() {
// 	return del(path.built.html);
// });


// WORKING HTML TASK
//*************************************************************************
gulp.task('html', function () {
	return gulp.src(path.src.html)
		.pipe(newer(path.built.html))
		.pipe(gulp.dest(path.built.html))
		.pipe(bs.reload({stream:true}));
});
//*************************************************************************
// CSS-Tricks
//--------------------------
// webdesign-master.ru - agragregra/gulp-lesson
//---------------------------
//Ilya Kantor - gulp-screencast
//---------------------------


// WORKING FONTS TASK
//*************************************************************************
gulp.task('fonts', function () {
	return gulp.src(path.src.fonts)
		.pipe(newer(path.built.fonts))
		.pipe(gulp.dest(path.built.fonts));
});
//*************************************************************************
// CSS-Tricks
//--------------------------
// webdesign-master.ru - agragregra/gulp-lesson
//---------------------------
//Ilya Kantor - gulp-screencast
//---------------------------


// WORKING IMAGES TASK
//*************************************************************************
gulp.task('images', function () {
	return gulp.src(path.src.img)
		// .pipe(newer(path.built.img))
		.pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest(path.built.img));
});
//*************************************************************************
// CSS-Tricks
//--------------------------
// gulp.task('images', function() {
// 	return gulp.src(path.src.img)
// 		// Caching images that ran through imagemin
// 		.pipe(cache(imagemin({
// 			interlaced: true,
// 		})))
// 		.pipe(gulp.dest(path.built.img))
// });
// webdesign-master.ru - agragregra/gulp-lesson
//---------------------------
// gulp.task('img', function() {
// 	return gulp.src('app/img/**/*') // Берем все изображения из app
// 		.pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
// 			interlaced: true,
// 			progressive: true,
// 			svgoPlugins: [{removeViewBox: false}],
// 			use: [pngquant()]
// 		})))
// 		.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
// });
//Ilya Kantor - gulp-screencast
//---------------------------


// WORKING BOWER TASK wiredep
//*************************************************************************
gulp.task('bower', function () {
	//var assets = useref.assets();

	return  gulp.src('src/*.html')
	.pipe(gulpIf(isDevelopment, sourcemaps.init()))
		.pipe(wiredep({
			directory: "src/bower_components" //Можно не писать т.к. определено в .bowerrc
		}).on('error', function (e) {
				console.log(e);
			})
		)
	//.pipe(assets)
	//.pipe(assets.restore())
	.pipe(useref())
	//.pipe(gulpIf('*.css', cssnano()))// Минифицируем только CSS файлы
	//.pipe(gulpIf('*.js', uglify()))// Uglifies only if it's a Javascript file
	.pipe(gulpIf(isDevelopment, sourcemaps.write()))
		.pipe(gulp.dest(path.built.html))
		.pipe(bs.reload({stream:true}))
		.pipe(debug({title: 'end:'}));
});
// Отлавливаем ошибки, выводит сообщение о проблеме без лишнего кода
// .on('error', function (e) {
// 	console.log(e);
// })


gulp.task('watch', ['bs', 'sass', 'bower', 'images'], function (){
	//gulp.watch('src/sass/styles.sass', ['sass']);
	gulp.watch(path.src.style, ['sass']);
	gulp.watch(path.src.html, ['bower']);
	//gulp.watch(path.built.html, bs.reload);
});

// Example
//*************************************************************************
gulp.task('minify-css', function() {
	return gulp.src('./src/*.css')
		.pipe(sourcemaps.init())
		.pipe(cleanCSS({debug: true}, function(details) {
			console.log(details.name + ': ' + details.stats.originalSize);
			console.log(details.name + ': ' + details.stats.minifiedSize);
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist'));
});






// /*
//
// // Watchers
// gulp.task('watch', function() {
// 	gulp.watch('app/scss/!**!/!*.scss', ['sass']);
// 	gulp.watch('app/!*.html', bs.reload);
// 	gulp.watch('app/js/!**!/!*.js', bs.reload);
// });
//
// // Optimization Tasks
// // ------------------
//
// // Optimizing CSS and JavaScript
// gulp.task('useref', function() {
//
// 	return gulp.src('app/!*.html')
// 		.pipe(useref())
// 		.pipe(gulpIf('*.js', uglify()))
// 		.pipe(gulpIf('*.css', cssnano()))
// 		.pipe(gulp.dest('dist'));
// });
//
// // Optimizing Images
// gulp.task('images', function() {
// 	return gulp.src('app/images/!**!/!*.+(png|jpg|jpeg|gif|svg)')
// 		// Caching images that ran through imagemin
// 		.pipe(cache(imagemin({
// 			interlaced: true,
// 		})))
// 		.pipe(gulp.dest('dist/images'))
// });
//
// // Copying fonts
// gulp.task('fonts', function() {
// 	return gulp.src('app/fonts/!**!/!*')
// 		.pipe(gulp.dest('dist/fonts'))
// });
//
// // Cleaning
// gulp.task('clean', function() {
// 	return del.sync('dist').then(function(callback) {
// 		return cache.clearAll(callback);
// 	});
// });
//
// gulp.task('clean:dist', function() {
// 	return del.sync(['dist/!**!/!*', '!dist/images', '!dist/images/!**!/!*']);
// });
//
// // Built Sequences
// // ---------------
//
// gulp.task('default', function(callback) {
// 	runSequence(['sass', 'bs', 'watch'],
// 		callback
// 	)
// });
//
// gulp.task('built', function(callback) {
// 	runSequence(
// 		'clean:dist',
// 		'sass',
// 		['useref', 'images', 'fonts'],
// 		callback
// 	)
// });*/
