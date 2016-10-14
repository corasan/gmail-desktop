var gulp = require("gulp");
// var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

gulp.task("default", function () {
  return gulp.src("src/index.js")
    // .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("bundle.js"))
    .pipe(gulp.dest("dist"));
});
