const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const genrateToken = require("../Config/genratewebToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all Fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already Exist");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      pic: user.pic,
      token: genrateToken(user._id),
      //  /for remember the currnt user
    });
  } else {
    res.send(400);
    throw new Error("failed to create user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      pic: user.pic,
      token: genrateToken(user._id),
      //  /for remember the currnt user
    });
  } else {
    res.send(400);
    console.log(user.matchPassword(password));
    throw new Error("Invalid Creadtinals");
  }
});

// /api/user?search=piyush
const allUser = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  console.log(users);
  res.send(users);
});

module.exports = { registerUser, authUser, allUser };
