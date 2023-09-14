const User = require("../models/User")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv').config();

async function register (req, res) {
  try {
      const data = req.body;

    console.log("Hi james", req.body)
      // Generate a salt with a specific cost
      const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
      console.log(salt)
      // Hash the password
      data["password"] = await bcrypt.hash(data["password"], salt);
console.log(data["password"])
      const result = await User.create(data);
    console.log("This log is after the user is created")
      res.status(201).send(result);
  } catch (err) {
      res.status(400).json({"error": err.message})
  }
};

async function login (req, res) {
  
  console.log("before the try statement",req.body)
    console.log("inside the try statement", req.body)
    const data = req.body;
    
      const user = await User.getByUsername(data.username);
       console.log("after it gets the username", data.username, "and password: ", data.password,"and here is the feen's data: ", data)
       console.log(data["password"])
       console.log("Kristian",user)
      const authenticated = await bcrypt.compare(data.password, user["password"]);
 
      if (!authenticated) {
          throw new Error("Incorrect credentials.");
      } else {
          const newToken = jwt.sign(
              { 
                  id: user.id,
                  username: user.username,
              },
              process.env.TOKEN_KEY,
              { expiresIn: "30s", }
          );
          const refreshToken = jwt.sign(
            { 
              id: user.id,
              username: user.username,
          },
          process.env.REFRESH_TOKEN,
          { expiresIn: "1d", }
          )
          res.cookie('jwt', refreshToken, {httpOnly: true, maxAge:24 * 60 * 60 * 10000})
          res.status(200).json({"token": newToken});
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
      "success": true,
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
      "message": "Unable to delete user",
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
