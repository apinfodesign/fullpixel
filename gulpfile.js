var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    nodemon    = require('gulp-nodemon'),
    sass       = require('gulp-sass'),
    notify     = require('gulp-notify'),
    bower      = require('gulp-bower'),
    gutil      = require('gulp-util'),
    livereload = require('gulp-livereload');

var config = {
    sassPath: 'public/stylesheets/*.scss',
    jsPath: 'public/js/ng/**/*.js',
    bowerDir: './bower_components',
    htmlPath: 'public/partials/*.html'
};

gulp.task('js', function(){
    gulp.src(['public/js/ng/controllers/module.js', config.jsPath])
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
       // .pipe(uglify())
        .pipe(gulp.dest('public'));
});
gulp.task('watch:js', ['js'], function(){
    gulp.watch(config.jsPath, ['js']);
});
gulp.task('html', function(){
    gulp.src(config.htmlPath)
        .pipe(livereload());
});
gulp.task('watch:html',['html'], function(){
    livereload.listen();
    gulp.watch(config.htmlpath,['html']);
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
    gulp.watch(config.sassPath,['css']);
});
gulp.task('dev:server', function(){
    nodemon({
        script: 'server.js',
        ect:    'js',
        ignore: ['ng*', 'gulp*', 'assets*']
    });
});
gulp.task('default',['watch:js', 'watch:css','watch:html', 'dev:server'],  function(){
});

