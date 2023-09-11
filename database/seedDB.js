const client = require('./setup')
require("dotenv").config()

const seedDB = async () => {
    currentDate = new Date();

    try {
        await client.connect()
        console.log("Awaiting Seed 🌱")
    
        //await client.db('ProgfolioCluster').collection('users').drop()
        await client.db('ProgfolioCluster').collection('users').insertMany([
            { email: "hasan@gmail.com", username: "hasanova18", password: "xyz", firstName: "hasan", lastName: "shahid", regDate: currentDate},
        ])
        const usersCollection = client.db('ProgfolioCluster').collection('users');

        const user = await usersCollection.findOne({ email: "hasan@gmail.com" });

        await client.db('ProgfolioCluster').collection('goals').insertMany([
            { userID: user._id, goal: "finish History Assignment", category: "School Work", status: 0,  progressValue: 50},
             ])
           
      
        console.log("DB Seeded 🌾")

        await client.close()
    } catch (e) {
        console.log(e)
    }
}

seedDB()