import express from "express";
import session from "express-session";
const app = express();
import configRoutes from "./routes/index.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import exphbs from "express-handlebars";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const staticDir = express.static(__dirname + "/public");

app.use(
  session({
    name: "AuthCookie",
    secret: "This is a secret.. shhh don't tell anyone",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 },
  })
);
app.use("/public", staticDir);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//(1)
// app.use("/", (req, res) => {
//   if (req.session.user) {
//     if (req.session.user.role === "admin") {
//       return res.redirect("/admin");
//     } else if (req.session.user.role === "user") {
//       return res.redirect("/protected");
//     }
//   } else {
//     return res.redirect("/login");
//   }
// });

//(2)
app.use("/login", (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === "admin") {
    return res.redirect("/admin");
  } else if (
    req.session &&
    req.session.user &&
    req.session.user.role === "user"
  ) {
    return res.redirect("/protected");
  } else {
    next();
  }
});

//(3)
app.use("/register", (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === "admin") {
    return res.redirect("/admin");
  } else if (
    req.session &&
    req.session.user &&
    req.session.user.role === "user"
  ) {
    return res.redirect("/protected");
  } else {
    next();
  }
});

//(4)
app.use("/protected", (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  } else {
    next();
  }
});

//(5)
app.use("/admin", (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role === "user") {
      res.status(403).render("error", {
        title: "You do not have permission to view this page.",
      });
    } else if (req.session.user.role === "admin") {
      next();
    }
  } else {
    return res.redirect("/login");
  }
});

//(6)
app.use("/logout", (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  } else {
    next();
  }
});

//(7)
app.use((req, res, next) => {
  console.log(
    `${new Date().toUTCString()}: ${req.method} ${req.originalUrl} (${
      req.session && req.session.user
        ? "Authenticated User"
        : "Non-Authenticated User"
    })`
  );
  next();
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
