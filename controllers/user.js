const User = require("../models/User")

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

const create = async (req, res) => {
  try {
    const data = req.body
    const result = await User.create(data)
    res.status(201).json({
      "success": true,
      "response": result
    })
  } catch (e) {
    res.status(404).json({
      "success": false,
      "message": "Unable to create new user",
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
    const result = await user.destory()
    res.status(204).json({
      "success": true,
      "respose": result
    })
  } catch (e) {
    res.status(404).json({
      "success": false,
      "message": "Unable to delete pokemon",
      "error": e,
    })
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
}