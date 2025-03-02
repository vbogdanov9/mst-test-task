const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const htmlmin = require("gulp-htmlmin");

gulp.task("server", function () {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
});

gulp.task("styles", function () {
  return gulp
    .src("src/sass/**/*.+(scss|sass)")
    .pipe(sass({ style: "compressed" }).on("error", sass.logError))
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(autoprefixer())
    .pipe(gulp.dest("dist/css"))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("html", function () {
  return gulp
    .src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("scripts", function () {
  return gulp
    .src("src/js/**/*.js")
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("fonts", function () {
  return gulp
    .src("src/fonts/**/*", { encoding: false })
    .pipe(gulp.dest("dist/fonts"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("icons", function () {
  return gulp
    .src("src/icons/**/*", { encoding: false })
    .pipe(gulp.dest("dist/icons"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("images", function () {
  return gulp
    .src("src/images/**/*", { encoding: false })
    .pipe(gulp.dest("dist/images"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("watch", function () {
  gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
  gulp.watch("src/*.html").on("change", gulp.parallel("html"));
  gulp.watch("src/js/**/*.js").on("change", gulp.parallel("scripts"));
  gulp.watch("src/fonts/**/*").on("all", gulp.parallel("fonts"));
  gulp.watch("src/icons/**/*").on("all", gulp.parallel("icons"));
  gulp.watch("src/images/**/*").on("all", gulp.parallel("images"));
});

// так пофиксил запуск  gulp, добавил задачу listen
gulp.task("listen", gulp.parallel("watch", "server"));

gulp.task(
  "default",
  gulp.series("styles", "scripts", "fonts", "html", "images", "icons", "listen")
);
