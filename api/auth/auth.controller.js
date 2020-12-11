const bcrypt = require('bcrypt');
const User = require('../user/user.model');
const { tokenCreate } = require('../../services/jwt.service');

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

const registrationController = async (req, res, next) => {
  try {
    const { body } = req;
    const isUserExist = await User.findUserByEmail({ email: body.email });
    if (isUserExist) {
      res.status(409).send({ 'message': 'user already exist' })
    }
    const passwordHashed = await bcrypt.hash(body.password, SALT_ROUNDS)

    const user = await User.createUser({
      name: body.name,
      email: body.email,
      password: passwordHashed
    })

    const token = await tokenCreate({ id: user._id });

    await User.updateUser(user._id, { token });

    res.status(200).send({ user, token })
  } catch (error) {
    next(error)
  }
};

const loginController = async (req, res, next) => {
  try {
    const { body: { email, password } } = req;
    const user = await User.findUserByEmail({ email });
    if (!user) {
      res.status(401).send({ 'message': 'email or password wrong' })
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      res.status(401).send({ 'message': 'email or password wrong' })
    }

    const token = await tokenCreate({ id: user._id });

    await User.updateUser(user._id, { token });
    res.status(200).send({ user, token })
  } catch (error) {
    next(error)
  }

};

const logoutController = async (req, res, next) => {
  try {
    const { user } = req;
    if (!user) {
      res.status(401).send({ "message": "Unauthorized" })
    }
    await User.updateUser(user._id, { token: '' })
    res.status(200).send({ "message": "user successfully log out" })
  } catch (error) {
    next(error)
  }
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
};
