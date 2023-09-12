const { Router } = require('express')
const goalController = require('../controllers/goals')

const goalRouter = Router()

goalRouter.get('/', goalController.index)
goalRouter.get('/:id', goalController.show)

goalRouter.post('/', goalController.create)

goalRouter.patch('/:id', goalController.update)

goalRouter.delete('/:id', goalController.destroy)

module.exports = goalRouter