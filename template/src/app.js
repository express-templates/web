const express = require("express");
const createError = require("http-errors");
const chalk = require("chalk");
const path = require("path");
{{#if_eq view "hjs"}}
const adaro = require("adaro");
{{/if_eq}}
{{#if_eq stylesheet "less"}}
const lessMiddleware = require("less-middleware");
{{/if_eq}}
{{#if_eq stylesheet "stylus"}}
const stylus = require("stylus");
{{/if_eq}}
{{#if_eq stylesheet "compass"}}
const compass = require("node-compass");
{{/if_eq}}
{{#if_in stylesheet "sass" "scss"}}
const sassMiddleware = require("node-sass-middleware");
{{/if_in}}
const morgan = require("morgan");
const helmet = require("helmet");
const express_import_routes = require("express-import-routes");
{{#if_xor axios extraction "extraction"}}
const alias = require("module-alias");
alias.addAlias("@axios", `${__dirname}/axios.js`);
{{/if_xor}}
{{#if_eq database "mongoose"}}
const db = require("./db");

db.connect().then(() => {
  console.log(chalk.blue("MongoDB connected!"));
});
{{/if_eq}}
require("dotenv").config();

const app = express();

{{#if_eq view "jade"}}
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
{{/if_eq}}
{{#if_eq view "ejs"}}
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
{{/if_eq}}
{{#if_eq view "pug"}}
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
{{/if_eq}}
{{#if_eq view "hbs"}}
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
{{/if_eq}}
{{#if_eq view "hjs"}}
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hjs");
{{/if_eq}}
{{#if_eq view "hjs"}}
app.engine('dust', adaro.dust());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'dust');
{{/if_eq}}
{{#if_eq view "twig"}}
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");
{{/if_eq}}
{{#if_eq view "vash"}}
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "vash");
{{/if_eq}}

app.use(morgan("dev"));
app.use(helmet());
app.use(require("cookie-parser")());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
{{#if_eq stylesheet "less"}}
app.use(lessMiddleware(path.join(__dirname, "..", "public")));
{{/if_eq}}
{{#if_eq stylesheet "stylus"}}
app.use(stylus.middleware(path.join(__dirname, "..", "public")));
{{/if_eq}}
{{#if_eq stylesheet "compass"}}
app.use(compass({ mode: "expanded" }));
{{/if_eq}}
{{#if_in stylesheet "sass" "scss"}}
app.use(sassMiddleware({
  src: path.join(__dirname, "..", "public"),
  dest: path.join(__dirname, "..", "public"),
  indentedSyntax: {{#if_eq stylesheet "sass"}}true{{/if_eq}}{{#if_eq stylesheet "scss"}}false{{/if_eq}}, // true = .sass and false = .scss
  sourceMap: true
}));
{{/if_in}}
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express_import_routes());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  console.error(chalk.red(err.message));
  res.end("Error");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App it running on port ${PORT}`);
  }
});

module.exports = app;