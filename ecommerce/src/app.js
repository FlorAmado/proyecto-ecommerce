require('dotenv').config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const coursesRouter = require("./routes/courses");
const localsUserCheck = require("./middlewares/localsUserCheck");
const cookieCheck = require("./middlewares/cookieCheck");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views")).set("view engine", "ejs");

app
  .use(logger("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(express.static(path.join(__dirname,"..", "public")))
  .use(methodOverride("_method"))
  .use(
    session({
      secret: "KitcheningForEver",
      resave :false,
      saveUninitialized : true
    })
  )
  .use(cookieCheck) //cargo en session lo que hay en la cookie
  .use(localsUserCheck) //cargo en locals lo que hay en session
  .use((req,res,next) => {
    req.session.message = null
    next()
  })


/* rutas */
app
  .use("/", indexRouter) //http://localhost:3000/
  .use("/users", usersRouter) //http://localhost:3000/users
  .use("/courses", coursesRouter); // http:localhost:3000/courses

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
