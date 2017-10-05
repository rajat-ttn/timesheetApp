let gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    bowerFiles = require('main-bower-files'),
    inject = require('gulp-inject'),
    stylus = require('gulp-stylus'),
    es = require('event-stream'),
    clean = require('gulp-clean'),
    appPath = './assets/';

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./assets/"
    });

    gulp.watch("./assets/src/**/*.scss", ['clean','sass']).on('change', browserSync.reload);
    gulp.watch("./assets/src/**/*.js", ['index']).on('change', browserSync.reload);
    gulp.watch("./assets/src/**/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("./assets/src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./assets/src/css"))
        .pipe(browserSync.stream());
});

gulp.task('clean', function () {
    return gulp.src('./assets/src/css', {read: false})
        .pipe(clean());
});

gulp.task('index', function () {
    var cssFiles = gulp.src('./assets/src/**/*.css')
        .pipe(stylus());

    gulp.src('./assets/index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower', ignorePath: 'assets', addRootSlash: false}))
        .pipe(inject(es.merge(
            cssFiles,
            gulp.src('./assets/src/**/*.js',  {read: false})
        ),{
            ignorePath: 'assets',
            addRootSlash: false
        }))
        .pipe(gulp.dest('./assets'));
});

gulp.task('default', ['index','serve']);