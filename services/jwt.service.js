const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const tokenCreate = async (payload) => {
  const token = await jwt.sign(payload, JWT_SECRET_KEY);
  return `Bearer ${token}`
}

const tokenVerify = async (token) => {
  const normalToken = token.replace('Bearer ', '');
  try {
    const result = await jwt.verify(normalToken, JWT_SECRET_KEY);
    return result
  } catch (error) {
    return ("Not authorized")
  }
}

module.exports = {
  tokenCreate,
  tokenVerify,
}