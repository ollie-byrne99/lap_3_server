const { ObjectId } = require("mongodb")
const client = require("../database/setup")

class Goal {
  constructor(data) {
    this._id = data._id
    this.goal = data.goal
    this.date = data.date
    this.category = data.category
    this.status = data.status
    this.progressValue = data.progressValue
  }

  static async getAll() {
    await client.connect()
    const response = await client.db("ProgfolioCluster").collection("goals").find()
    const allValues = await response.toArray()
    return allValues
  }

  static async getOne(date) {
    await client.connect()
    try {
      const response = await client
        .db("ProgfolioCluster")
        .collection("goals")
        .findOne({
          date: date, // Query based on the 'date' field
        });
  
      if (!response) {
        return null; // Return null if no goal is found
      }
  
      const goal = new Goal(response);
      return goal;
    } catch (error) {
      throw error; // Handle any errors that occur during the database query
    } 
  }

  static async getOneById(_id) {
    await client.connect();
    try {
      const response = await client
        .db("ProgfolioCluster")
        .collection("goals")
        .findOne({
          _id: new ObjectId(_id), // Query based on the '_id' field using ObjectId
        });
  
      console.log('line 52 Model', response);
  
      if (!response) {
        return null; // Return null if no goal is found
      }
  
      const goal = new Goal(response);
      return goal;
    } catch (error) {
      console.log('line 62 model', error);
      throw error; // Handle any errors that occur during the database query
    } 
  }



  static async create({ goal, date, category, status, progressValue }) {
    await client.connect()
    const response = await client.db("ProgfolioCluster").collection("goals").insertOne({
        goal: goal, 
        date: date,
        category: category,
        status: status,
        progressValue: progressValue 
    })
    return "goal created"
  }


  async update({goal, date, category, status, progressValue }) {
    await client.connect()
    const response = await client
      .db("ProgfolioCluster")
      .collection("goals")
      .updateOne({ date: this.date }, { $set: { goal, date, category, status, progressValue } })
    return "goal updated"
  }

  async destroy() {
    await client.connect()
    const response = await client.db("ProgfolioCluster").collection("goals").deleteOne({ _id: this.id})
    return "goal deleted"
  }
}

module.exports = Goal
