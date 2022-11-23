const express = require('express');

const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();
const Favorite = require("../models/Favorite");

router.get("/favorites" , isLoggedIn, async (req, res) => {
    const userId = req.session.currentUser
      try {
          const dbFavorites = await Favorite.find({user: userId}).populate("place")
          console.log(dbFavorites)
          res.render("places/placesFavorites" , { dbFavorites })
      } catch (error) {
          console.log(error)
      }
  })
  
  
  router.post('/favorites/:favoriteId/delete', async (req, res) => {
      const favoriteId = req.params.favoriteId
      try {
         const dbFavorite = await Favorite.findOneAndDelete({favoriteId})
         res.redirect('/favorites') 
      } catch (error) {
          console.log(error)
      }
  })
  
  
  module.exports = router