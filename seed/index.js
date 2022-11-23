const mongoose = require("mongoose")

// Require the models,  Example: (-- const Book = require("../models/Book.model") --)
const User = require("../models/User.model")

const users = [
   {
      email: 'test1@example.com ',
      password: '123456',
      name: 'test1',
      userName: 'test1',
      placesIds: [],
      image: "https://i.imgur.com/sFXx9ni.jpg"
   },
   {
      email: 'test2@example.com ',
      password: '123456',
      name: 'test2',
      userName: 'test2',
      placesIds: [],
      image: "https://i.imgur.com/4csktko.jpg"
   },
   {
      email: 'test3@example.com ',
      password: '123456',
      name: 'test3',
      userName: 'test3',
      placeId: [],
      image: "https://i.imgur.com/0UeAVae.jpg",
      review: []
   },
]
const MONGO_URI = "mongodb://localhost:27017/project3"


const createSeeds = async function () {
   try {
      const connect = await mongoose.connect(MONGO_URI)
      console.log(`Connected to database: ${connect.connections[0].name}`)

      // ------------------- Users seeds ---------------------
      const deleteAll = await User.deleteMany()
      console.log("Db clean")
      const createAll = await User.create(users)
      console.log("Users created")
      // ------------------- User seeds ----------------------
      const dbClose = await mongoose.connection.close()
      console.log("Connection closed")
   } catch (err) {
      console.log(`Error creating the seeds: ${err}`)
   }
}

createSeeds()
