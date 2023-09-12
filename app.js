const express = require('express')
const cors = require('cors')
const logger = require('morgan');
const userRouter = require('./routes/userRoutes');
const goalRouter = require('./routes/goalsRoutes');
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express()

app.use(express.json());
app.use(cors());
app.use(logger('dev'))


app.get("/", (req, res) => {
    res.json({
        title: "ProgFolio",
        description: "Time to manage your goals!"
    })
})

app.use("/users", userRouter)
app.use("/goals", goalRouter);

app.get("/check-token", (req, res) => {
    try {
      const token = req.headers["authorization"].split(' ')[1];
        console.log(token);
      if (token == "null" || !token) {
          throw new Error("User not authenticated.");
      } else {

        try {
            const user_token = jwt.verify(token, process.env.TOKEN_KEY);
            res.status(204).end();
        } catch (err) {
            res.status(400).json({"error": err.message});
        }
      }

    } catch (err) {
        res.status(400).json({"error": err.message});
    }
});
module.exports = app
