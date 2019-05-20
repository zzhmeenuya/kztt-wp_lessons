var syntax        = 'sass', // Syntax: sass or scss;
		gulpVersion		= 4;

var gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync').create(),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require("gulp-notify"),
		rsync         = require('gulp-rsync'),
		imagemin 			= require('gulp-imagemin');


gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
});

gulp.task('styles', function() {
	return gulp.src('assets/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	// .pipe(cleancss( {level: { 1: { specialComments: 0 } } } )) // Opt., comment out when debugging
	.pipe(gulp.dest('assets/css'))
	.pipe(browserSync.stream())
});

gulp.task('scripts', function() {
	return gulp.src([
		'assets/libs/jquery/dist/jquery.min.js',
		'assets/libs/swiper/dist/js/swiper.min.js',
		'assets/js/common.js', // Always at the ends
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('assets/js'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('code', function(){
	return gulp.src( ['*.html', '*.php'] )
		.pipe(browserSync.reload({ stream: true }))
});


if( gulpVersion == 3 ){

	gulp.task( 'watch', ['styles', 'scripts', 'browser-sync'], function() {
		gulp.watch( 'assets/'+syntax+'/**/*.'+syntax+'', ['styles'] );
		gulp.watch( ['assets/libs/**/*.js', 'assets/js/common.js'], ['scripts'] );
		gulp.watch( ['*.html', '*.php'], ['code'] );
	});
	gulp.task( 'default',['watch'] );

}

if( gulpVersion == 4 ){

	gulp.task( 'watch', function() {
		gulp.watch( 'assets/'+syntax+'/**/*.'+syntax+'', gulp.parallel('styles') );
		gulp.watch( ['assets/libs/**/*.js', 'assets/js/common.js'], gulp.parallel('scripts') );
		gulp.watch( ['*.html', '*.php'], gulp.parallel('code') );
	});
	gulp.task( 'default', gulp.parallel('watch', 'styles', 'scripts', 'browser-sync') );

}