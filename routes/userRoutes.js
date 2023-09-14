const { Router } = require('express')
const userController = require('../controllers/user')
const verifyToken = require('../middleware/authenticator')
const userRouter = Router()

userRouter.get('/', verifyToken, userController.index)
userRouter.get('/:id', userController.show)

userRouter.post("/register",userController.register);
userRouter.post("/login", userController.login);

userRouter.patch('/:id', userController.update)

userRouter.delete('/:id', userController.destroy)

module.exports = userRouter