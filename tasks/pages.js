var gulp = require("gulp")
var opts = require("./options")
var util = require("gulp-util")
var plumber = require("gulp-plumber")
var jade = require("gulp-jade")
var paths = require("./paths")
var path = require("path")
var jadeExtenstionRE = /\.jade$/
var windowsRE = /\\/g
var options = require("./cache/options")

/**
 * task pages
 *
 * compiles jade to html with `exports`, `lang` and `tasks/cache/options`
 * available
 */
module.exports = function(){
  var stream = gulp.src(paths.sources.pages)

  options.update()

  stream.on("data", function(file){
    options.value.locals.page = path.relative(
      path.resolve(paths.sources.pagesRoot), file.path
    )
    .replace(jadeExtenstionRE, "")
    .replace(windowsRE, "/")
  })

  return stream
    .pipe(opts.plumber ? plumber() : util.noop())
    .pipe(jade(options.value))
    .pipe(gulp.dest(paths.dist.pages))
}
