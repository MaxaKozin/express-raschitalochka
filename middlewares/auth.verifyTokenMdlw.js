const { tokenVerify } = require("../services/jwt.service");
const User = require("../api/user/user.model");

const verifyTokenMdlw = async (req, res, next) => {
  try {
    const headerToken = req.get("Authorization");
    if (!headerToken) {
      return res.status(401).send({ message: "Not authorized" });
    }
    const payload = await tokenVerify(headerToken);
    const { id } = payload;
    if (payload === "Not authorized") {
      res.status(401).send({
        message: "Not authorized",
      });
    }
    const user = await User.findUserById(id);
    req.user = user;
    req.userId = id;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyTokenMdlw };
