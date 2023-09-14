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
    const idx = req.params.date
    const goal = await Goal.getOne(idx)
    if (!goal) {
      // If the goal is not found, respond with a 404 status code.
      return res.status(404).json({
        success: false,
        message: 'Goal not found',
      });
    }
    res.status(200).json({
      "success": true,
      "goal": goal
      
    })
  } catch (e) {
    res.status(404).json({
      "success": false,
      "message": "goal not found",
      "error": e.message
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
    console.log('line 64 controller', idx)
    const data = req.body
    console.log('line 66 controller', data)
    const goal = await Goal.getOneById(idx) 
    console.log('line 68', goal)
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
    console.log('line 87 controller', idx)
    const goal = await Goal.getOneById(idx)
    console.log('line 89 controller', goal)
    const result = await goal.destroy()
    console.log('line 91 controller', result)
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
