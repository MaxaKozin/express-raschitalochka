const { tokenVerify } = require('../services/jwt.service');

const verifyTokenMdlw = async (req, res, next) => {
  try {
    const headerToken = req.get('Authorization')
    if (!headerToken) {
      return res.status(401).send({ "message": "Not authorized" })
    }
    const result = await tokenVerify(headerToken);
    console.log(result);
    if (result === "Not authorized") {
      res.status(401).send({
        "message": "Not authorized"
      })
    }
    req.user = result;
    next();
  } catch (error) {
    next(error);;
  }
}

module.exports = { verifyTokenMdlw };