/*==== The Constants Declaration ====*/
const {src, dest, parallel, series, watch} = require('gulp');

const browserSync = require('browser-sync').create();
const uglify      = require('gulp-uglify-es').default;
const concat      = require('gulp-concat');
const babel       = require('gulp-babel');
const scss        = require('gulp-sass')(require('sass'));
const prefixer    = require('gulp-autoprefixer');
const clean       = require('gulp-clean');


/*==== The Funcrions Declaration ====*/
function $browserSync() {
	browserSync.init({
		server: {baseDir: "app/"},
		notify: false,
		online: true
	});
}

function script() {
	return src('app/js/main.js')
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('app/script'))
		.pipe(browserSync.stream())
}

function style() {
  return src('app/scss/style.scss')
  .pipe(concat('style.min.css'))
  .pipe(scss({outputStyle: 'compressed'}))
	.pipe(prefixer({overrideBrowserslist: ['last 10 versions'], grid: true}))
  .pipe(dest('app/style'))
  .pipe(browserSync.stream())
}

function copy() {
	return src([
		'app/style/style.min.css',
		'app/script/main.min.js',
		'app/images/**/*.*',
		'app/fonts/**/*.*',
		'app/favicons/*.*',
		'app/*.html'
	], {base: 'app'})
		.pipe(dest('dist'))
}

function cleanDist() {
	return src('dist')
		.pipe(clean())
}

function watching() {
	watch('app/js/main.js', script);
	watch('app/scss/*.scss', style);
	watch('app/*.html').on('change', browserSync.reload);
}

/*==== The Exported Tasks Declaration ====*/
exports.build   = series(cleanDist, style, script, copy);
exports.default = parallel(style, script, $browserSync, watching);