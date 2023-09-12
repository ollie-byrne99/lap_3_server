const User = require("../models/User")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();

async function register (req, res) {
  try {
      const data = req.body;

      // Generate a salt with a specific cost
      const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

      // Hash the password
      data["password"] = await bcrypt.hash(data["password"], salt);

      const result = await User.create(data);

      res.status(201).send(result);
  } catch (err) {
      res.status(400).json({"error": err.message})
  }
};

async function login (req, res) {
  const data = req.body;
  try {
      const user = await User.getByEmail(data.email);
      const authenticated = await bcrypt.compare(data.password, user["password"]);

      if (!authenticated) {
          throw new Error("Incorrect credentials.");
      } else {
          const newToken = jwt.sign(
              { 
                  id: user.id,
                  username: user.username,
                  isAdmin: user.isAdmin
              },
              process.env.TOKEN_KEY,
              { expiresIn: "1h", }
          );
          res.status(200).json({"token": newToken});
      }
      
  } catch (err) {
      res.status(403).json({"error": err.message})
  }
}
const index = async (req, res) => {
  try {
    const user = await User.getAll()
    res.status(200).json({
      "success": true,
      "user": user
    })
  } catch (e) {
    res.status(500).json({
      "success": false,
      "message": "User not available right now",
      "error": e,
    })
  }
}

const show = async (req, res) => {
  try {
    const idx = req.params.id
    const user = await User.getOne(idx)
    res.status(200).json({
      "success": true,
      "User": user
    })
  } catch (e) {
    res.status(404).json({
      "success": false,
      "message": "User not found",
      "error": e,
    })
  }
}



const update = async (req, res) => {
  try {
    const idx = req.params.id
    const data = req.body
    const user = await User.getOne(idx)
    const result = await user.update(data)
    res.status(200).json({
      "succuess": true,
      "response": result
    })
  } catch (e) {
    res.status(404).json({
      "success": false,
      "message": "Unable to update user",
      "error": e,
    })
  }
}


const destroy = async (req, res) => {
  try {
    const idx = req.params.id
    const user = await User.getOne(idx)
    const result = await user.destroy()
    res.status(204).json({
      "success": true,
      "respose": result
    })
  } catch (e) {
    res.status(404).json({
      "success": false,
      "message": "Unable to delete goal",
      "error": e,
    })
  }
}

module.exports = {
  register,
  login,
  index,
  show,
  update,
  destroy
}
