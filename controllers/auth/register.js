const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const { User } = require("../../models/user");

const { createError, sendMail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, "Email in use");
  }
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Подтверждение регистрации на сайте",
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}">Нажмите для подтверждения email</a>`,
  };

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
  await sendMail(mail);
};

module.exports = register;
