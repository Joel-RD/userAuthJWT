import express from "express";
import publics from "./routers/public/public.js";
import auth from "./routers/auth/auth.js";
import privateRouter from "./routers/private/private.js";
import logger from "morgan";
import path from "node:path";
import exphbs from "express-handlebars";
import cookieParser from "cookie-parser";
import { config } from "../config.js";

const app = express();

const {PORT, console_log} = config();

//Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//static files
app.use(express.static(path.join(process.cwd(), "src", "views")));

//use handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(process.cwd(), 'src', 'views'));

app.use(publics, auth, privateRouter);

app.all("*", (req, res) => {
  res.redirect("/home");
});

app.listen(PORT, () => {
  console_log(`Server running on port http://localhost:${PORT}/home`);
});
