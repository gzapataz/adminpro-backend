const { request, response, raw } = require("express");

const bcript = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require("../helpers/jwt");

const login = async (req = request, res = response) => {

  const { email, password } = req.body;
  try {
    const userDB = await User.findOne({ email });
    if (!userDB) {
      return res.status(404).json({
        "ok": false,
        "msg": 'Invalid credentials'
      });
    }
    const validPwd = bcript.compareSync(password, userDB.password);
    if (!validPwd) {
      return res.status(404).json({
        "ok": false,
        "msg": 'Invalid credentials'
      });
    }
    const token = await generateJWT(userDB.id);
    return res.status(200).json({
      "ok": true,
      "user": userDB,
      token
    })
  } catch (error) {
    return res.status(500).json({
      "ok": false,
      "msg": "Application Error check with the commerce"
    })
  }

}

module.exports = {
  login
}
