const express = require('express');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const router = express.Router();
const Favorite = require("../models/Favorite");
const mongoose = require('mongoose')
const fileUploader = require('../config/cloudinary.config');


router.get("/favorites", isAuthenticated, async (req, res) => {
    const userId = req.payload
    try {
        const dbFavorites = await Favorite.find({ user: userId }).populate("place")
        console.log(dbFavorites)
        res.json(dbFavorites)
    } catch (error) {
        console.log(error)
    }
})


router.post('/favorites/:favoriteId/delete', async (req, res) => {
    const favoriteId = req.params.favoriteId
    try {
        const dbFavorite = await Favorite.findOneAndDelete({ favoriteId })
        res.redirect('/favorites')
    } catch (error) {
        console.log(error)
    }
})


module.exports = router

