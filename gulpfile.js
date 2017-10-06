let gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    bowerFiles = require('main-bower-files'),
    inject = require('gulp-inject'),
    stylus = require('gulp-stylus'),
    es = require('event-stream'),
    clean = require('gulp-clean'),
    appPath = './assets/',
    gulpCopy = require('gulp-copy');

gulp.task('serve', ['sass'], function() {
    gulp.watch("./assets/src/**/*.scss", ['clean','sass','cleanTmp','copy']);
    gulp.watch("./assets/src/**/*.js", ['index','cleanTmp','copy']);
    gulp.watch("./assets/**/*.html", ['cleanTmp','copy']);
});

gulp.task('sass', function() {
    return gulp.src("./assets/src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./assets/src/css"))
        .pipe(browserSync.stream());
});

gulp.task('clean', function () {
    return gulp.src(['./assets/src/css'], {read: false})
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

gulp.task('cleanTmp', function(){
    return gulp.src(['./.tmp/**/*.*'], {read: false})
        .pipe(clean());
});

gulp.task('copy', function(){
    return gulp
        .src('./assets/**')
        .pipe(gulp.dest('./.tmp/public'));
});

gulp.task('default', ['index','cleanTmp','copy','serve']);