const gulp = require("gulp"),
    watch = require("gulp-watch"),//检测插件
    del = require('del'),// gulp删除插件
    uglify = require('gulp-uglify'),// 压缩js插件
    css = require('gulp-clean-css'),//gulp压缩css文件
    htmlmin = require('gulp-htmlmin'),//gulp压缩html文件
    rename = require("gulp-rename"),//引用重命名插件
    rev = require('gulp-rev'), //文件添加哈希值
    concat = require('gulp-concat'), //文件合并
    browserSync = require('browser-sync'),//浏览器热更新
    reload = browserSync.reload,
    changed = require('gulp-changed'),//
    connect = require('gulp-connect'), //启动服务器
    open = require('open'), //用于打开浏览器查看指定url的页面
    sass = require('gulp-sass'), // scc编译
    less = require('gulp-less'), // less编译
    spritesmith = require('gulp.spritesmith'); // 雪碧图

gulp.task("server", function () {
    connect.server({
        root:'./',
        port:8888,
        livereload: true
    });
    open('http://localhost:8888');
});
gulp.task('html', function () {
    return gulp.src('./*.html')
        .pipe(connect.reload())
});

gulp.task('watch',function(){
    gulp.watch('./*.html',gulp.series('html'))
});

gulp.task("dev",gulp.series(
    'server',
    'watch'
));
