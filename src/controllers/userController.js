const bcrypt = require("bcrypt");
const saltRounds = 10;

const EventModel = require("../models/eventModel");
const UserModel = require("../models/userModel");
const validator = require("../utils/validator");

const registerUser = async (req, res) => {
  try {
    if (!validator.isValidRequestBody(req.body))
      return res.status(400).json({
        status: false,
        msg: "Invalid request parameters, please provide user details",
      });

    let { firstName, lastName, email, password } = req.body;

    if (!validator.isValid(firstName))
      return res
        .status(400)
        .json({ status: false, msg: "first name is required" });

    if (!validator.isValid(lastName))
      return res
        .status(400)
        .json({ status: false, msg: "last name is required" });

    if (!validator.isValid(email))
      return res.status(400).json({ status: false, msg: "email is required" });

    let isEmailUsed = await UserModel.findOne({ email });

    if (isEmailUsed)
      return res
        .status(400)
        .json({ status: false, msg: `${email} already exists` });

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      return res
        .status(400)
        .json({ status: false, message: "Invalid Email id." });

    if (!validator.isValid(password))
      return res
        .status(400)
        .json({ status: false, msg: "password is required" });

    if (password.length < 8 || password.length > 15)
      return res
        .status(400)
        .json({ status: false, msg: "password length be between 8-15" });

    let hasedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      firstName,
      lastName,
      email,
      password: hasedPassword,
    };

    let user = await UserModel.create(newUser);
    return res
      .status(201)
      .send({ status: true, message: "User created successfully", data: user });
  } catch (err) {
    return res.status(500).json({ status: false, msg: err.message });
  }
};


///
const login = async (req, res) => {
  try {
    if (!validator.isValidRequestBody(req.body))
      return res.status(400).json({
        status: false,
        message: "Invalid parameters ,please provide email and password",
      });

    let { email, password } = req.body;

    if (!validator.isValid(email))
      return res.status(400).json({
        status: false,
        message: "email is required",
      });

    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))
      return res.status(400).json({
        status: false,
        message: `Email should be a valid email address`,
      });

    if (!validator.isValid(password))
      return res
        .status(400)
        .json({ status: false, message: "password is required" });

    if (password.length < 8 || password.length > 15)
      return res
        .status(400)
        .json({ status: false, msg: "password length be btw 8-15" });

    if (email && password) {
      let User = await UserModel.findOne({ email: email });
      if (!User)
        return res
          .status(400)
          .json({ status: false, msg: "email does not exist" });

      let decryppasss = await bcrypt.compare(password, User.password);

      if (decryppasss) {
        const Token = jwt.sign(
          {
            userId: User._id,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 30 * 60,
            //exp date 30*60=30min
          },
          `${process.env.SECRET_KEY}`
        );

        return res.status(200).json({
          status: true,
          msg: "successfully loggedin",
          data: { userId: User._id, token: Token },
        });
      } else
        return res.status(400).json({ status: false, Msg: "Invalid password" });
    }
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = { registerUser , login};
