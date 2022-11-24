const mongoose = require("mongoose")
const Places = require("../models/Place.model")

// Require the models,  Example: (-- const Book = require("../models/Book.model") --)
const User = require("../models/User.model")

const users = [
   {
      email: 'test1@example.com',
      password: '$2b$10$G.lg.0IzCFXikF69XTUh1uX3PjRzObnc5sJ13ManJl4k9M7LkaqpW',
      // 12345Tmb
      name: 'test1',
      userName: 'test1',
      createdPlaceId: [],
      image: "https://i.imgur.com/sFXx9ni.jpg"
   },
   {
      email: 'test2@example.com ',
      password: '$2b$10$G.lg.0IzCFXikF69XTUh1uX3PjRzObnc5sJ13ManJl4k9M7LkaqpW',
      name: 'test2',
      userName: 'test2',
      createdPlaceId: [],
      image: "https://i.imgur.com/4csktko.jpg"
   },
   {
      email: 'test3@example.com ',
      password: '$2b$10$G.lg.0IzCFXikF69XTUh1uX3PjRzObnc5sJ13ManJl4k9M7LkaqpW',
      name: 'test3',
      userName: 'test3',
      createdPlaceId: [],
      image: "https://i.imgur.com/0UeAVae.jpg",
      review: []
   },
]

const places = [

   {
     name: "Billy Brunch",      
     type: "Cafeteria", 
     address: "Carrer de Bailèn, 115, 08009 Barcelona ", 
     picture: "https://www.metropoliabierta.com/uploads/s1/19/19/48/6/aperturabilly.jpeg", 
     socialMedia: "https://www.instagram.com/billybrunch/?hl=es",
   },
   {
     name: "Granja M.Viader",      
     type: "Cafeteria", 
     address: "Carrer d'en Xuclà, 4, 08001 Barcelona", 
     picture: "https://inandoutbarcelona.net/wp-content/uploads/2012/02/granjaviader_portada.jpg", 
     sociaMedia: "https://www.instagram.com/granjaviader/?hl=es", 
   },
 
   {
     name: "LeccaBaffi",      
     type: "Restaurant", 
     address: "Carrer de València, 341, 08009 Barcelona", 
     picture: "https://www.gluto.it/immagini/locali/9098.jpg", 
     socialMedia: "https://www.instagram.com/leccabaffibcn/?hl=es", 
   },
   {
     name: "La Nena",      
     type: "Cafeteria", 
     address: "Carrer de Ramón y Cajal, 36, 08012 Barcelona", 
     picture: "https://media-cdn.tripadvisor.com/media/photo-s/04/a8/b8/cd/prima-sfeer.jpg", 
     socialMedia: "https://www.instagram.com/granjalanena/?hl=es", 
   },
 
   {
     name: "Caelum",      
     type: "Cafeteria", 
     address: "Carrer de la Palla, 8, 08002 Barcelona", 
     picture: "https://blog.apartmentbarcelona.com/wp-content/uploads/2013/11/jewish2-1024x682.jpg", 
     socialMedia: "https://www.instagram.com/caelumbcn/?hl=es", 
   },
 
   {
     name: "Casa Batllo",      
     type: "Museum", 
     address: "Passeig de Gràcia, 43, 08007 Barcelona", 
     picture: "https://www.metropoliabierta.com/uploads/s1/18/46/66/5/casa-batllo-2_9_1200x480.jpeg", 
     socialMedia: "https://www.casabatllo.es/", 
   },
 
   {
     name: "Pueblo Espnayol",      
     type: "Museum", 
     address: "Av. Francesc Ferrer i Guàrdia, 13, 08038 Barcelona", 
     picture: "https://blog.apartmentbarcelona.com/wp-content/uploads/2013/11/jewish2-1024x682.jpg", 
     socialMedia: "https://upload.wikimedia.org/wikipedia/commons/4/41/Poble_Espanyol_-_Torres_de_%C3%81vila.jpg", 
   },
 
 
   {
     name: "Playa de Llevant",      
     type: "Beach", 
     address: "Passeig Marítim del Bogatell, 145, 08005 Barcelona, Madrid", 
     picture: "https://static.lasprovincias.es/comun/movil2016/imagenes_playas/0001254.jpg", 
     socialMedia: "", 
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


      // ------------------- Place seeds ---------------------
      const deleteAllPlaces = await Places.deleteMany()
      console.log("Db clean")
      const createAllPlaces = await Places.create(places)
      console.log("Users created")
            // ------------------- Place seeds ----------------------


      const dbClose = await mongoose.connection.close()
      console.log("Connection closed")
   } catch (err) {
      console.log(`Error creating the seeds: ${err}`)
   }
}

createSeeds()
