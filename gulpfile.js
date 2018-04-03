var gulp = require('gulp');

/* ### 디렉토리 설정 */
var src = 'public/src', // 작업 디렉토리
	dist = 'public/dist'; // 배포 디렉토리

	src = {
		html : {
				all : [
					src + '/**/*',
					'!'+src + '/pjtCom/**'
				]
			},

		css : {
				all : src+'/pjtCom/css/**/*',
				lib : src+'/pjtCom/css/lib/*',
				common : src+'/pjtCom/css/common.css',
				main : src+'/pjtCom/css/main.css',
				sub : [
						src+'/pjtCom/css/*.css',
						'!'+src+'/pjtCom/css/common.css',
						'!'+src+'/pjtCom/css/main.css'
					]
			},

		fonts : {
				all : src+'/pjtCom/fonts/**/*'
			},

		js : {
				all : src+'/pjtCom/js/**/*'
			},

		img : {
				all : src+'/pjtCom/images/*/*'
			}
	};



/**
 * --------------------------------
 * PLUGIN
 * --------------------------------
 */
var del = require('del'),
	concat = require('gulp-concat'),
	imagemin = require('gulp-imagemin'),
	watch = require('gulp-watch');


/**
 * --------------------------------
 * WATCH
 * --------------------------------
 */
gulp.task('watch', function () { // 파일 변경체크
	gulp.watch(src.html.all, ['htmlBuild']);
	gulp.watch(src.css.all, ['cssBuild']);
	gulp.watch(src.fonts.all, ['fontsBuild']);
	gulp.watch(src.js.all, ['jsBuild']);
	gulp.watch(src.img.all, ['imgBuild']);
});



/**
 * --------------------------------
 * HTML BUILD
 * --------------------------------
 */
gulp.task('htmlBuild', ['htmlClean'], function() {
	return gulp
		.src(src.html.all) // HTML 경로
		.pipe(gulp.dest(dist + '/')); // HTML 저장
}).task('htmlClean', function () {
	return del.sync(  // HTML 제거
		[
			dist + '/**/*',
			'!'+dist + '/pjtCom/**'
		]
	);
});



/**
 * --------------------------------
 * CSS BUILD
 * --------------------------------
 */
gulp.task('cssBuild', ['cssClean', 'cssSub', 'cssLib'], function () {
	return gulp
		.src([src.css.common, src.css.main]) // CSS 경로
		.pipe(gulp.dest(dist+'/pjtCom/css/')); // CSS 저장
}).task('cssLib', function () {
	return gulp
		.src(src.css.lib)
		.pipe(gulp.dest(dist+'/pjtCom/css/lib/'));
}).task('cssSub', function () {
	return gulp
		.src(src.css.sub)
		.pipe(concat('sub.css')) // sub페이지 css를 sub.css로 Merge합니다.
		.pipe(gulp.dest(dist+'/pjtCom/css/'));
}).task('cssClean', function () {
	return del.sync(  // CSS 제거
		[
			dist + '/pjtCom/css/**/*'
		]
	);
});



/**
 * --------------------------------
 * FONTS BUILD
 * --------------------------------
 */
 gulp.task('fontsBuild', ['fontsClean'], function () {
 	return gulp
 		.src(src.fonts.all) // CSS 경로
 		.pipe(gulp.dest(dist+'/pjtCom/fonts/')); // CSS 저장
 }).task('fontsClean', function () {
 	return del.sync(  // JS 제거
 		[
 			dist + '/pjtCom/fonts/**/*'
 		]
 	);
 });



/**
 * --------------------------------
 * JS BUILD
 * --------------------------------
 */
 gulp.task('jsBuild', ['jsClean'], function () {
 	return gulp
 		.src(src.js.all) // CSS 경로
 		.pipe(gulp.dest(dist+'/pjtCom/js/')); // CSS 저장
 }).task('jsClean', function () {
 	return del.sync(  // JS 제거
 		[
 			dist + '/pjtCom/js/**/*'
 		]
 	);
 });



 /**
  * --------------------------------
  * IMG BUILD
  * --------------------------------
  */
  gulp.task('imgBuild', ['imgClean'], function () {
  	return gulp
  		.src(src.img.all) // IMAGES 경로
		.pipe(imagemin([  // IMAGES OPTIMIZE
				imagemin.gifsicle({interlaced: true}),
				imagemin.jpegtran({progressive: true}),
				imagemin.optipng({optimizationLevel: 5}),
				imagemin.svgo({plugins: [{removeViewBox: true}]})
			]))
  		.pipe(gulp.dest(dist+'/pjtCom/images/')); // IMAGES 저장
  }).task('imgClean', function () {
  	return del.sync(  // IMAGES 제거
  		[
  			dist + '/pjtCom/images/*/*'
  		]
  	);
  });



/**
 * --------------------------------
 * GULP BUILD
 * --------------------------------
 */
gulp.task('default', ['htmlBuild', 'cssBuild', 'fontsBuild', 'jsBuild', 'imgBuild', 'watch'], function(){
	console.log(
		'/**********************************************************\n\n'+
		'     BUILD 완료.                        \n\n'+
		'**********************************************************/'
	)
});
