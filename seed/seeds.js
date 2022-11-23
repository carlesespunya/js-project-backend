const mongoose = require("mongoose")
const Places = require("../models/place")

const MONGO_URI = "mongodb://localhost:27017/project-3-backend"


const createSeeds = async function () {
  try {
    const connect = await mongoose.connect(MONGO_URI)
    console.log(`Connected to database: ${connect.connections[0].name}`)
    await Places.create(Places)

    const dbClose = await mongoose.connection.close()
  } catch (err) {
  }
}
const Places = [

  {
    name: "Billy Brunch",      
    type: "Brunch", 
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
createSeeds()
