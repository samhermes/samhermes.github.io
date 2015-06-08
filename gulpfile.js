var gulp = require("gulp");
var s3 = require("gulp-s3");
var aws = require("./aws.json");


gulp.task('default', function() {
  gulp.src('./_site/**')
    .pipe(s3(aws));
});
