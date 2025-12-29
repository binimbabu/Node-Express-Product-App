const path = require("path");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const bodyParser = require("body-parser");
const express = require("express");

const sequelize = require("./util/database");

const Product = require("./models/product");

const User = require("./models/user");

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

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(er));
});

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use(errorController.pageNotFound);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Anna",
        email: "anna@example.com",
      });
    }
    return user;
  })
  .then((user) => {
    console.log(user);
    app.listen(3000);
  })
  .catch((err) => console.log(err));
