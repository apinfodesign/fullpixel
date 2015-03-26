var gulp = require('gulp'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
ngAnnotate = require('gulp-ng-annotate'),
nodemon = require('gulp-nodemon'),
sass = require('gulp-sass'),
notify = require('gulp-notify'),
bower = require('gulp-bower'),
gutil = require('gulp-util'),
livereload = require('gulp-livereload'),
config = {
    sassPath: 'public/stylesheets/*.scss',
    bowerDir: './bower_components'
};

gulp.task('welcome', function(){
    console.log('Welcome to Gulp!');
});

gulp.task('hello',['welcome'], function () {
    console.log('Hello World.');
});

gulp.task('js', function(){
    gulp.src(['public/js/ng/controllers/module.js','./public/js/ng/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
       // .pipe(uglify())
        .pipe(gulp.dest('public'));
});
gulp.task('watch:js', ['js'], function(){
    gulp.watch('public/js/ng/**/*.js', ['js']);
});
gulp.task('bower', function(){
    return bower()
        .pipe(gulp.dest(config.bowerDir));
});
gulp.task('css', function(){
     gulp.src(config.sassPath)
         .pipe(sass())
         .pipe(concat('style.css'))
         .pipe(gulp.dest('public'))
         .pipe(livereload());
});
gulp.task('watch:css',['css'], function(){
    livereload.listen();
    gulp.watch('public/stylesheets/*.scss',['css']);
});
gulp.task('dev:server', function(){
    nodemon({
        script: 'server.js',
        ect:    'js',
        ignore: ['ng*', 'gulp*', 'assets*']
    });
});
gulp.task('default',['watch:js', 'watch:css', 'dev:server'],  function(){
});

