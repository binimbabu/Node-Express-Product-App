const path = require("path");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const bodyParser = require("body-parser");
const express = require("express");
// const expresshbs = require("express-handlebars");

const errorController = require("./controllers/error");

const app = express();
app.set("view engine", "ejs");
// app.engine(
//   "handlebars",
//   expresshbs({
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layout",
//     extname: ".handlebars",
//   })
// );
// app.set("view engine", "handlebars");
// app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use(errorController.pageNotFound);
app.listen(3000);
