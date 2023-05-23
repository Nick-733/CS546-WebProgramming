//import express, express router as shown in lecture code

import { Router } from "express";
import userData from "../data/users.js";
import validation from "../helper.js";
const router = Router();

router.route("/").get(
  (req, res, next) => {
    if (!req.session.user) {
      return res.redirect("/login");
    } else if (req.session.user.role === "admin") return res.redirect("/admin");
    else if (req.session.user.role === "user")
      return res.redirect("/protected");
    next();
  },
  async (req, res) => {
    //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
    return res.json({ error: "YOU SHOULD NOT BE HERE!" });
  }
);

// router.route("/").get(async (req, res) => {
//   //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
//   if (req.session.user) {
//     if (req.session.user.role === "admin") {
//       return res.redirect("/admin");
//     } else if (req.session.user.role === "user") {
//       return res.redirect("/protected");
//     } else {
//       return res.redirect("/login");
//     }
//   } else {
//     return res.json({ error: "YOU SHOULD NOT BE HERE!" });
//   }
// });

router
  .route("/register")
  .get(async (req, res) => {
    // code here for GET
    return res.render("register", {
      title: "Registration",
      header: "Registration",
    });
  })
  .post(async (req, res) => {
    //code here for POST
    try {
      req.body.firstNameInput = validation.checkString(
        req.body.firstNameInput,
        "First Name"
      );
      req.body.lastNameInput = validation.checkString(
        req.body.lastNameInput,
        "Last Name"
      );
      req.body.emailAddressInput = validation.checkString(
        req.body.emailAddressInput,
        "Email Address"
      );
      req.body.emailAddressInput = req.body.emailAddressInput.toLowerCase();
      req.body.passwordInput = validation.checkString(
        req.body.passwordInput,
        "Password"
      );
      req.body.roleInput = validation.checkString(req.body.roleInput, "Role");
      req.body.roleInput = req.body.roleInput.toLowerCase();

      if (
        req.body.firstNameInput.length < 2 ||
        req.body.firstNameInput.length > 25
      )
        throw `First name should be in length between 2 to 25.`;
      if (
        req.body.lastNameInput.length < 2 ||
        req.body.lastNameInput.length > 25
      )
        throw `Last name should be in length between 2 to 25.`;

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.emailAddressInput)) {
        throw `Invalid Email Address`;
      }
      if (req.body.passwordInput.length < 8) {
        throw `Password must be at least 8 characters long`;
      }
      if (!/[A-Z]/.test(req.body.passwordInput)) {
        throw `Password must contain at least one uppercase character`;
      }
      if (!/\d/.test(req.body.passwordInput)) {
        throw `Password must contain at least one number`;
      }
      if (!/\W/.test(req.body.passwordInput)) {
        throw `Password must contain at least one special character`;
      }

      if (req.body.confirmPasswordInput !== req.body.passwordInput) {
        throw `Confirm Password does not match Password`;
      }

      // if (req.body.roleInput !== "admin" || req.body.roleInput !== "user") {
      //   throw `Invalid role. Only "admin" or "user" allowed.`;
      // }
    } catch (e) {
      return res.status(400).render("register", {
        title: "Registration",
        header: "Registration",
        error: e,
      });
    }

    try {
      let newUser = await userData.createUser(
        req.body.firstNameInput,
        req.body.lastNameInput,
        req.body.emailAddressInput,
        req.body.passwordInput,
        req.body.roleInput
      );
      if (newUser.insertedUser == true) {
        return res.redirect("/login");
      }
    } catch (e) {
      return res.status(400).render("register", {
        title: "Registraion",
        header: "Registration",
        error: e,
      });
    }

    res.status(500).render("error", {
      title: "Error 500",
      header: "Error 500",
      error: "Internal Server Error",
    });
  });

router
  .route("/login")
  .get(async (req, res) => {
    //code here for GET
    return res.render("login", { title: "Login", header: "Login" });
  })
  .post(async (req, res) => {
    //code here for POST
    try {
      req.body.emailAddressInput = validation.checkString(
        req.body.emailAddressInput,
        "Email Address"
      );
      req.body.emailAddressInput = req.body.emailAddressInput.toLowerCase();
      req.body.passwordInput = validation.checkString(
        req.body.passwordInput,
        "Password"
      );

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.emailAddressInput)) {
        throw `Invalid Email Address`;
      }

      if (req.body.passwordInput.length < 8) {
        throw `Password must be at least 8 characters long`;
      }
      if (!/[A-Z]/.test(req.body.passwordInput)) {
        throw `Password must contain at least one uppercase character`;
      }
      if (!/\d/.test(req.body.passwordInput)) {
        throw `Password must contain at least one number`;
      }
      if (!/\W/.test(req.body.passwordInput)) {
        throw `Password must contain at least one special character`;
      }
    } catch (e) {
      return res.status(400).render("login", {
        title: "Login",
        header: "Login",
        error: e,
      });
    }

    try {
      let user = await userData.checkUser(
        req.body.emailAddressInput,
        req.body.passwordInput
      );
      if (user._id) {
        req.session.user = {
          firstName: user.firstName,
          lastName: user.lastName,
          emailAddress: user.emailAddress,
          role: user.role,
        };
        //console.log(req.session.user);
        if (user.role === "admin") {
          return res.redirect("/admin");
        } else if (user.role === "user") {
          return res.redirect("/protected");
        }
      } else {
        throw `Either the email address or password is invalid`;
      }
    } catch (e) {
      return res.status(400).render("login", {
        title: "Login",
        header: "Login",
        error: e,
      });
    }

    res.status(500).render("error", {
      title: "Error 500",
      header: "Error 500",
      error: "Internal Server Error",
    });
  });

router.route("/protected").get(async (req, res) => {
  //code here for GET
  try {
    let date = new Date();
    let isAdmin = false;
    if (req.session.user.role === "admin") {
      isAdmin = true;
    }
    return res.render("protected", {
      user: req.session.user,
      date: date.toLocaleTimeString(),
      isAdmin: isAdmin,
    });
  } catch (e) {
    console.log(e);
  }
});

router.route("/admin").get(async (req, res) => {
  //code here for GET
  try {
    let date = new Date();
    return res.render("admin", {
      admin: req.session.user,
      date: date.toLocaleTimeString(),
    });
  } catch (e) {
    console.log(e);
  }
});

router.route("/error").get(async (req, res) => {
  //code here for GET
  return res.render("Error", { title: Error });
});

router.route("/logout").get(async (req, res) => {
  //code here for GET
  req.session.destroy();
  return res.render("logout", { title: "Logged Out" });
});

export default router;
