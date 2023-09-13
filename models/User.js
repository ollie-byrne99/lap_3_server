const { ObjectId } = require("mongodb")
const client = require("../database/setup")

class User {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.username = data.username
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.regDate = data.regDate
  }

  static async getAll() {
    await client.connect()
    const response = await client.db("ProgfolioCluster").collection("users").find()
    const allValues = await response.toArray()
    return allValues
  }

  static async getOne(idx) {
    await client.connect()
    const id = new ObjectId(idx)
    const response = await client.db("ProgfolioCluster").collection("users").find({
      _id: id,
    })
    const value = await response.toArray()
    const user = new User(value[0])
    user['id'] = id
    return user
  }
  static async getByUsername(username) {
    const response = await client.connect();
   
      await client.connect();
      const users = client.db('ProgfolioCluster').collection('users'); 
  
      const user = await users.findOne({ username });
  
      if (!user) {
        throw new Error("Unable to locate user.");
      }
      return new User(user);
    
  } 
  static async create({ email, username, password, firstName, lastName, regDate }) {
    await client.connect()
    const response = await client.db("ProgfolioCluster").collection("users").insertOne({
      email: email,
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      regDate: regDate
    })
    return "user created"
  }


  async update({username, email, password, firstName, lastName}) {
    await client.connect()
    const response = await client
      .db("ProgfolioCluster")
      .collection("users")
      .updateOne({ _id: this.id }, { $set: { username, email, password, firstName, lastName} })
    return "user updated"
  }

  async destroy() {
    await client.connect()
    const response = await client.db("ProgfolioCluster").collection("users").deleteOne({ _id: this.id })
    return "user deleted"
  }
}

module.exports = User