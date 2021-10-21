import path from "path";

import chalk from "chalk";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express, { Application, Request, Response, NextFunction } from "express";
import express_import_routes, { setSrcRoot } from "express-import-routes";
import helmet from "helmet";
import createError from "http-errors";
import alias from "module-alias";
import morgan from "morgan";
{{#if_eq view "hjs"}}
import adaro from "adaro";
{{/if_eq}}
{{#if_eq stylesheet "less"}}
import lessMiddleware from "less-middleware";
{{/if_eq}}
{{#if_eq stylesheet "stylus"}}
import stylus from "stylus";
{{/if_eq}}
{{#if_eq stylesheet "compass"}}
import compass from "node-compass";
{{/if_eq}}
{{#if_in stylesheet "sass" "scss"}}
import sassMiddleware from "node-sass-middleware";
{{/if_in}}
{{#if_eq database "mongoose"}}
import db from "./db";
{{/if_eq}}

alias.addAlias("src", __dirname);

{{#if_eq database "mongoose"}}
db.connect().then(() => {
  console.log(chalk.blue("MongoDB connected!"));
});
{{/if_eq}}
dotenv.config();
setSrcRoot(__dirname);

const app: Application = express();

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
app.use(cookieParser());
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
app.use((req: Request, res: Response, next: NextFunction): void => {
  next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(chalk.red(err.message));
  res.end("Error");
});

const PORT: number = +(process.env.PORT || 8080);

app.listen(PORT, (err?: any): void => {
  if (err) {
    console.error(err);
  } else {
    console.log(`⚡️App it running on port ${PORT}`);
  }
});

export default app;