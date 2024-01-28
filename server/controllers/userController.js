const User = require("../models/userModel");
const Role = require("../models/rolesModel");
const sendToken = require("../utils/jwtToken");

//@description     Get or Search users by parameter
//@route           GET /api/alluser
const allUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  try {
    const users = await User.find(keyword)
      .find({
        _id: { $ne: req.user._id },
      })
      .select("username email");
    return res.status(200).json({ success: true, users });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ success: false });
  }
};

const registerUser = async (req, res) => {
  const { username, email, password, roles } = req.body;
  try {
    if (!username || !email || !password) {
      throw new Error("Please Enter all the Fields");
    }
    const userExists = await User.findOne({ $or: [{ username }, { email }] });

    if (userExists) {
      throw new Error("User already exists by this Username or Email");
    }
    let user = await User.create({
      username,
      email,
      password,
      roles,
    });

    if (user) {
      user = await user.populate("roles");
      sendToken(user, 201, res);
    }
  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("Please Enter all the Fields");
    }
    let user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    if (user && (await user.matchPassword(password))) {
      user = await user.populate("roles");
      sendToken(user, 200, res);
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};

const logoutUser = (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    maxAge: 0,
    sameSite: "None",
    secure: true,
  });
  return res.status(200).json({
    success: true,
    msg: "Logged Out",
  });
};

const isLogin = async (req, res) => {
  const user = req.user;
  if (user) {
    return res.status(200).json({
      success: true,
      auth: true,
      user: {
        username: user.username,
        email: user.email,
        userId: user._id,
      },
    });
  }
};

module.exports = { allUsers, registerUser, loginUser, logoutUser, isLogin };
