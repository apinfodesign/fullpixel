var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-ruby-sass');
var notify = require('gulp-notify');
var bower = require('gulp-bower');
var config = {
    sassPath: './resources/sass',
    bowerDir: './bower_components'
};

gulp.task('welcome', function(){
    console.log('Welcome to Gulp!');
});

gulp.task('hello',['welcome'], function () {
    console.log('Hello World.');
});

gulp.task('js', function(){
    gulp.src(['ng/module.js','ng/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('assets'));
});
gulp.task('watch:js', ['js'], function(){
    gulp.watch('ng/**/*.js', ['js']);
});
gulp.task('bower', function(){
    return bower()
        .pipe(gulp.dest(config.bowerDir));
});
gulp.task('css', function(){
    return gulp.src(config.sassPath + '/style.scss')
        .pipe(sass({
            style: 'compressed',
            loadPath: [
                './resources/sass',
            //    config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
                config.bowerDir + '/fontawesome/scss'
            ]
        })
            .on('error', notify.onError(function(error){
                return "Error: " + error.message;
            })))
        .pipe(gulp.dest('./css'));

});
gulp.task('dev:server', function(){
    nodemon({
        script: 'server.js',
        ect:    'js',
        ignore: ['ng*', 'gulp*', 'assets*']
    });
});

