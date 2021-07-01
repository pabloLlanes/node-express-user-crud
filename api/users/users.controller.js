const { response, request } = require("express");

const User = require("./user.model");

/**
 * get a single user
 */
const getSingleUser = async (req = response, res = request) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    //verify if user is enable
    if (!user.enable) {
      return res.status(404).json({ msg: "user is disable" });
    }

    res.json({
      msg: `user encountered`,
      user,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: get a single user",
    });
  }
};
/**
 * get all users
 */
const getAllUsers = async (req = request, res = response) => {
  const { limit = 20, from = 0 } = req.query;
  const query = { enable: true };

  try {
    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query).skip(Number(from)).limit(Number(limit)),
    ]);

    res.json({
      msg: `total users: ${total}`,
      users,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: get all users",
    });
  }
};

/**
 * create user
 */
const createUser = async (req = response, res = request) => {
  try {
    const { name, username, email, password } = req.body;

    const newUser = new User({
      name,
      username,
      email,
      password: await User.encryptPassword(password),
    });

    await newUser.save();

    res.status(201).json({
      msg: "create user ok",
      name,
      email,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: create user",
    });
  }
};
/**
 * update user
 */
const updateUser = async (req = response, res = request) => {
  const { id } = req.params;
  const { password, email, ...body } = req.body;

  try {
    await User.findByIdAndUpdate(id, body);

    res.status(201).json({
      msg: "update user ok",
      body,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: update user",
    });
  }
};

/**
 * delete user
 */
const deleteUser = async (req = response, res = request) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { enable: false });
    res.json({ user });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: delete user",
    });
  }
};

const hardDeleteUser = async (req, res = response) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    res.json({
      msg: "deleted user ok",
      user,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: delete user",
    });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  hardDeleteUser,
};
