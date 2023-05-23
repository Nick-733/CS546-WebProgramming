//import mongo collections, bcrypt and implement the following data functions
import bcrypt from "bcrypt";
const saltRounds = 16;
import { users } from "../config/mongoCollections.js";
import validation from "../helper.js";

const exportedMethods = {
  async createUser(firstName, lastName, emailAddress, password, role) {
    firstName = validation.checkString(firstName, "First Name");
    lastName = validation.checkString(lastName, "Last Name");
    emailAddress = validation.checkString(emailAddress, "Email Address");
    emailAddress = emailAddress.toLowerCase();
    password = validation.checkString(password, "Password");
    role = validation.checkString(role, "Role");
    role = role.toLowerCase();

    if (firstName.length < 2 || firstName.length > 25)
      throw `First name should be in length between 2 to 25.`;
    if (lastName.length < 2 || lastName.length > 25)
      throw `Last name should be in length between 2 to 25.`;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      throw `Invalid Email Address`;
    }

    const userCollection = await users();
    const email = await userCollection.findOne({ emailAddress: emailAddress });
    if (email !== null) {
      throw `This Email Address Alredy Exists !`;
    }

    if (password.length < 8) {
      throw `Password must be at least 8 characters long`;
    }
    if (!/[A-Z]/.test(password)) {
      throw `Password must contain at least one uppercase character`;
    }
    if (!/\d/.test(password)) {
      throw `Password must contain at least one number`;
    }
    if (!/\W/.test(password)) {
      throw `Password must contain at least one special character`;
    }

    // if (role !== "admin" || role !== "user") {
    //   throw `Invalid role. Only "admin" or "user" allowed.`;
    // }

    let newUser = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      password: await bcrypt.hash(password, saltRounds),
      role: role,
    };

    const insertInfo = await userCollection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
      throw "Could not add the User";
    }
    return { insertedUser: true };
  },

  async checkUser(emailAddress, password) {
    emailAddress = validation.checkString(emailAddress, "Email Address");
    emailAddress = emailAddress.toLowerCase();
    password = validation.checkString(password, "Password");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      throw `Invalid Email Address`;
    }

    if (password.length < 8) {
      throw `Password must be at least 8 characters long`;
    }
    if (!/[A-Z]/.test(password)) {
      throw `Password must contain at least one uppercase character`;
    }
    if (!/\d/.test(password)) {
      throw `Password must contain at least one number`;
    }
    if (!/\W/.test(password)) {
      throw `Password must contain at least one special character`;
    }

    const userCollection = await users();
    const user = await userCollection.findOne({ emailAddress: emailAddress });
    if (user === null) {
      throw `Either the email address or password is invalid`;
    }

    const hashedPassword = await userCollection.findOne(
      { emailAddress: emailAddress },
      { projection: { _id: 0, password: 1 } }
    );

    try {
      if (await bcrypt.compare(password, hashedPassword.password)) {
        return user;
      } else {
        throw `Either the email address or password is invalid`;
      }
    } catch (e) {
      return e;
    }
  },
};
export default exportedMethods;
