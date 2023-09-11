require("dotenv").config()
const { MongoClient } = require("mongodb")

const MONGODB_URI = process.env.MONGODB_URI
console.log("MongoDB URI:", process.env.MONGODB_URI);

const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const connectDB = async () => {
    try {
        await client.connect()
        console.log("Connected successfully 🚀")
    } catch (error) {
        console.log(error)
    }
}

 connectDB()

module.exports = client