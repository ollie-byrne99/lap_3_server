const { ObjectId } = require("mongodb")
const client = require("../database/setup")

class Goal {
  constructor(data) {
    this.id = data.id
    this.goal = data.goal
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

  static async getOne(idx) {
    await client.connect()
    const id = new ObjectId(idx)
    const response = await client.db("ProgfolioCluster").collection("goals").find({
      _id: id,
    })
    const value = await response.toArray()
    const goal = new Goal(value[0])
    user['id'] = id
    return goal
  }

  static async create({ goal, category, status, progressValue }) {
    await client.connect()
    const response = await client.db("ProgfolioCluster").collection("goals").insertOne({
        goal: goal, 
        category: category,
        status: status,
        progressValue: progressValue 
    })
    return "goal created"
  }


  async update({goal, category, status, progressValue }) {
    await client.connect()
    const response = await client
      .db("ProgfolioCluster")
      .collection("goals")
      .updateOne({ _id: this.id }, { $set: { goal, category, status, progressValue } })
    return "goal updated"
  }

  async destroy() {
    await client.connect()
    const response = await client.db("ProgfolioCluster").collection("goals").deleteOne({ _id: this.id })
    return "goal deleted"
  }
}

module.exports = Goal