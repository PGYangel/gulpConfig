/**
 * gulp.src(globs[, options])
 * 输出（Emits）符合所提供的匹配模式（glob）或者匹配模式的数组（array of globs）的文件。
 * 将返回一个 Vinyl files 的 stream 它可以被 piped 到别的插件中。
 *
 * gulp.dest(path[, options])
 * 能被 pipe 进来，并且将会写文件。并且重新输出（emits）所有数据，因此你可以将它 pipe 到多个文件夹。
 * 如果某文件夹不存在，将会自动创建它。
 * 文件被写入的路径是以所给的相对路径根据所给的目标目录计算而来。类似的，相对路径也可以根据所给的 base 来计算。
 *
 * gulp.task(name[, deps], fn)
 * 定义一个使用 Orchestrator 实现的任务（task）。
 * name任务的名字，如果你需要在命令行中运行你的某些任务，那么，请不要在名字中使用空格。
 * deps类型： Array一个包含任务列表的数组，这些任务会在你当前任务运行之前完成。
 * gulp.task('mytask', ['array', 'of', 'task', 'names'], function() {});
 * 注意： 你的任务是否在这些前置依赖的任务完成之前运行了？
 * 请一定要确保你所依赖的任务列表中的任务都使用了正确的异步执行方式：
 * 使用一个 callback，或者返回一个 promise 或 stream。
 *
 * gulp.watch(glob [, opts], tasks) 或 gulp.watch(glob [, opts, cb])
 * 监视文件，并且可以在文件发生改动时候做一些事情。它总会返回一个 EventEmitter 来发射（emit） change 事件。
 *
 * // task()：定义任务
 * // src():源文件
 * // pipe():管道流，接通源头文件与目标文件的输出
 * // dest():输出文件的目的地
 * // watch():监视文件
 **/

var gulp = require('gulp');
var del = require('del');// gulp删除插件
var uglify = require('gulp-uglify');// 压缩js插件
var css = require('gulp-clean-css');　　//gulp压缩css文件
var rename = require("gulp-rename");　　//引用重命名插件
var rev = require('gulp-rev');//文件添加哈希值
const connect = require('gulp-connect'); // 服务
const config = require('./config.json'); // 外调配置文件

// 复制单个文件
gulp.task('copyHtml', function () {
    console.log(config.common.url)
    return gulp.src('index.html').pipe(gulp.dest('dist'))
});
// 复制多个文件
gulp.task('copyAllHtml', function () {
    return gulp.src('*.html').pipe(gulp.dest('dist'))
});

// 3、复制指定文件
// [指定的文件已，指定的文件2]
gulp.task('copy2Js', function () {
    return gulp.src(['js/test1.js', 'js/test2.js']).pipe(
        gulp.dest('dist/js')
    )
});

// 复制多个后缀名的图片
gulp.task('copyImage', function () {
    return gulp.src('images/*.{png,jpg,bmp,jpeg,gif}').pipe(
        gulp.dest('dist/images')
    )
});

// 删除文件
gulp.task('del', function () {
    // del('./dist/public/img/*.{jpg,png,jepg,gif}')
    // *：所有文件
    // **：所有文件夹
    return del(['dist/*'])
});

// 压缩js文件
gulp.task('ysjs', function () {
    return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('minjs'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('.'))
});

// 压缩css文件
gulp.task('css', function () {
    return gulp.src('css/*.css')
        .pipe(css())
        .pipe(gulp.dest('mincss'))
});

//12、重命名css文件
gulp.task('reName', function () {
    return gulp.src('css/*.css')
        .pipe(rename({suffix: '.css'}))
        .pipe(css())
        .pipe(gulp.dest('mincss'))
});

gulp.task('myWatch',function(){
    gulp.watch('js/*.js',gulp.series('ysjs'))
});
gulp.task('connect', function () {
    connect.server({
        root: "src",
        port: 8181,
        livereload: true,
    });
});

// gulp.series：按照顺序执行
// gulp.paralle：可以并行计算
// 启动开发环境
// gulp.task('dev', gulp.series(gulp.parallel('myWatch', 'connect')));
gulp.task('dev', gulp.series('del', 'copyHtml', 'copyAllHtml', 'copy2Js', 'copyImage', 'ysjs', 'css', 'reName',gulp.parallel('myWatch', 'connect')));
// 构建项目
/*gulp.task('build',gulp.series());*/
