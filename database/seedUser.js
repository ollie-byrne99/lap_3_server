const client = require('./setup')
require("dotenv").config()

const seedDB = async () => {
    try {
        await client.connect()
        console.log("Awaiting Seed 🌱")
    
        //await client.db('ProgfolioCluster').collection('users').drop()
        await client.db('ProgfolioCluster').collection('users').insertMany([
            { email: "hasan@gmail.com", username: "hasanova18", password: "xyz", firstName: "hasan", lastName: "shahid", regDate: 0},
            
        
        ])
        console.log("DB Seeded 🌾")
        await client.close()
    } catch (e) {
        console.log(e)
    }
}

seedDB()