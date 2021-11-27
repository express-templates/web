import { boot } from "express-fw";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"; 
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
export default boot(({ app }) => {
  {{#if_eq view "jade"}}
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("view engine", "jade");
  {{/if_eq}}
  {{#if_eq view "ejs"}}
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("view engine", "ejs");
  {{/if_eq}}
  {{#if_eq view "pug"}}
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("view engine", "pug");
  {{/if_eq}}
  {{#if_eq view "hbs"}}
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("view engine", "hbs");
  {{/if_eq}}
  {{#if_eq view "hjs"}}
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("view engine", "hjs");
  {{/if_eq}}
  {{#if_eq view "hjs"}}
  app.engine('dust', adaro.dust());
  app.set('views', path.join(__dirname, "..", 'views'));
  app.set('view engine', 'dust');
  {{/if_eq}}
  {{#if_eq view "twig"}}
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("view engine", "twig");
  {{/if_eq}}
  {{#if_eq view "vash"}}
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("view engine", "vash");
  {{/if_eq}}
  
  app.use(morgan("dev"));
  app.use(helmet());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  {{#if_eq stylesheet "less"}}
  app.use(lessMiddleware(path.join(__dirname, "..", "..", "public")));
  {{/if_eq}}
  {{#if_eq stylesheet "stylus"}}
  app.use(stylus.middleware(path.join(__dirname, "..", "..", "public")));
  {{/if_eq}}
  {{#if_eq stylesheet "compass"}}
  app.use(compass({ mode: "expanded" }));
  {{/if_eq}}
  {{#if_in stylesheet "sass" "scss"}}
  app.use(sassMiddleware({
    src: path.join(__dirname, "..", "..", "public"),
    dest: path.join(__dirname, "..", "..", "public"),
    indentedSyntax: {{#if_eq stylesheet "sass"}}true{{/if_eq}}{{#if_eq stylesheet "scss"}}false{{/if_eq}}, // true = .sass and false = .scss
    sourceMap: true
  }));
  {{/if_in}}
});