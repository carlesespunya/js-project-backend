const express = require('express');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const router = express.Router();
const Favorite = require("../models/Favorite");
const mongoose = require('mongoose')

router.get("/favorites" , isAuthenticated, async (req, res) => {
    const userId = req.session.currentUser
      try {
          const dbFavorites = await Favorite.find({user: userId}).populate("place")
          console.log(dbFavorites)
          res.jason("places/placesFavorites" , { dbFavorites })
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