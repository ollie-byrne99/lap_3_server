const Goal = require("../models/Goal")

const index = async (req, res) => {
  try {
    const goal = await Goal.getAll()
    res.status(200).json({
      "success": true,
      "goal": goal
    })
  } catch (e) {
    res.status(500).json({
      "success": false,
      "message": "Goal not available right now",
      "error": e,
    })
  }
}

const show = async (req, res) => {
  try {
    const idx = req.params.id
    const goal = await Goal.getOne(idx)
    res.status(200).json({
      "success": true,
      "User": user
    })
  } catch (e) {
    res.status(404).json({
      "success": false,
      "message": "goal not found",
      "error": e,
    })
  }
}

const create = async (req, res) => {
  try {
    const data = req.body
    const result = await Goal.create(data)
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
    const goal = await Goal.getOne(idx)
    const result = await goal.update(data)
    res.status(200).json({
      "succuess": true,
      "response": result
    })
  } catch (e) {
    res.status(404).json({
      "success": false,
      "message": "Unable to update goal",
      "error": e,
    })
  }
}


const destroy = async (req, res) => {
  try {
    const idx = req.params.id
    const goal = await Goal.getOne(idx)
    const result = await goal.destroy()
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
  index,
  show,
  create,
  update,
  destroy
}
