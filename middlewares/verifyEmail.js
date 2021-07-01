const { request, response } = require("express");
const User = require("../api/users/user.model");

const isEmailResgistered = async (req = request, res = response, next) => {
  const { email } = req.body;
  const isEmailExist = await User.findOne({ email });

  if (isEmailExist) {
    return res.status(400).json({
      msg: `${email} has already been registered `,
    });
  }

  next();
};

module.exports = { isEmailResgistered };
