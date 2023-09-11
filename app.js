const express = require('express')
const cors = require('cors')
const logger = require('morgan');
const userRouter = require('./routes/userRoutes');
const goalRouter = require('./routes/goalsRoutes');

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

app.use("/user", userRouter)
app.use("/goals", goalRouter);

module.exports = app
