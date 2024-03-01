const User = require('../models/user');
const { validationResult } = require('express-validator');
const bcript = require('bcryptjs');
const { request, response } = require('express');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {
  const users = await User.find({}, 'name email role google');
  return res.json(
    {
      ok: true,
      users
    });
}

const createUsers = async (req, res = response) => {

  const { email, password, name } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped()
    });
  }

  try {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: 'The email already exists'
      });
    }
    const user = new User(req.body);
    // Encrypt password
    const salt = bcript.genSaltSync();
    user.password = bcript.hashSync(password, salt);

    const token = await generateJWT(user.id);

    await user.save();
    return res.json(
      {
        "ok": true,
        user,
        token
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator'
    });
  }
}

const updateUser = async (req = request, res = response) => {

  const uid = req.params.id;

  try {

    const userDB = await User.findById(uid);
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: 'User doesn\'t exists'
      });
    }
    // Validate 
    // Update fields
    const { google, password, ...fields } = req.body;

    if (fields.email !== userDB.email) {
      const checkMail = await User.findOne({ email: fields.email });
      if (checkMail) {
        return res.status(400).json({
          "ok": false,
          "msg": "eMail already registered"
        })
      }
    }

    const updatedUser = await User.findByIdAndUpdate(uid, fields, { new: true });
    return res.json(
      {
        "ok": true,
        "user": updatedUser
      });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator'
    });
  }
}

const deleteUser = async (req = request, res = response) => {
  const uid = req.params.id;
  try {

    const userDB = await User.findById(uid);
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: 'User doesn\'t exists'
      });
    }

    await User.findByIdAndDelete(uid);
    return res.json(
      {
        "ok": true,
        "id": uid
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator'
    });
  }
}

module.exports = {
  createUsers,
  deleteUser,
  getUsers,
  updateUser,
}

