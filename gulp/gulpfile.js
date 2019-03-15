const gulp = require("gulp");
const gulpconcat = require("gulp-concat");
//html
const gulphtmlmin = require("gulp-htmlmin");
//css
const gulpsass = require("gulp-sass");
const gulpautoprefixer = require("gulp-autoprefixer");
const gulpcleancss = require("gulp-clean-css");
//js
const gulpbabel = require("gulp-babel");
const gulpuglify = require("gulp-uglify");
const babelcore = require("babel-core");
//webserver
const gulpwebserver = require("gulp-webserver");

const fs = require("fs");
const path = require("path");

//压缩 HTML文件并打包
gulp.task("html", function () {
    //执行不包含home.html所有的html文件
    return gulp.src(["./start/src/html/*.html", "!./start/src/html/home.html"])
        .pipe(gulphtmlmin({
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeEmptyAttributes: true,
            removeComments: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        }))
        .pipe(gulp.dest("./bind/src/html"))
})
//压缩 scss文件并转义打包
gulp.task("scss", function () {
    return gulp.src(["./start/src/scss/*.scss", "!./start/src/scss/common.scss"])
        .pipe(gulpautoprefixer({ //这是最低版本
            browsers: ["last 2 versions"],
            cascade: false
        })) //版本号
        .pipe(gulpsass()) //转义sass
        .pipe(gulpcleancss()) //压缩css
        .pipe(gulp.dest("./bind/src/css"))
})

//压缩 js文件并转义打包
gulp.task("js", function () {
    return gulp.src("./start/src/js/*.js")
        .pipe(gulpbabel({ //es6 转义es5
            presets: "es2015"
        }))
        .pipe(gulpuglify()) //压缩js
        .pipe(gulp.dest("./bind/src/js"))
})

//监听工作区实时更新
gulp.task("watch", function () {
    //gulp.series 同步执行  按添加顺序依次执行
    gulp.watch("./start/src/html/*.html", gulp.series("html"))
    gulp.watch("./start/src/scss/*.scss", gulp.series("scss"))
    gulp.watch("./start/src/js/*.js", gulp.series("js"))
})

gulp.task("server", function () {
    return gulp.src("./") //目标地址
        .pipe(gulpwebserver({
            port: 3000, //端口号
            open:true,
            livereload: true, //网页更新
            host: "192.168.137.44", //修改书写服务器  对外开放使用本机IP  对内可省略不写或localhost
            proxies: [{
                    source: "/data/json",
                    target: "http://192.168.137.44:9090"
                },
                {
                    source: "/",
                    target: "http://192.168.137.44:8080"
                }
            ] //设置代理
            //source 设置接口号 target跳转服务器地址
        }))
})

gulp.task("home", function () {
    return gulp.src(".")
        .pipe(gulpwebserver({
            port: 8080,
            host: "192.168.137.44",
            middleware: [(req, res, next) => {
                if (req.url == "/favicon.ico") {
                    return res.end()
                }
                var local=req.url=="/"?"/bind/src/html/index.html":req.url;
                console.log(local)
                res.end(fs.readFileSync(path.join(__dirname, local)))
            }]
        }))
})
gulp.task("web1", function () { //下级代理地址
    return gulp.src(".")
        .pipe(gulpwebserver({
            port: 9090,
            host:"192.168.137.44",
            middleware: [(req, res, next) => {
                
                next() //移交控制权给下一级
            }, (req, res, next) => {
                //接受控制权并处理
                res.end("123")
            }]
        }))
})

//gulp.parallel 异步执行
gulp.task("bind", gulp.parallel("server", "web1", "home", "watch"))