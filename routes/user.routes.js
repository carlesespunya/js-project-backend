const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();
const User = require("../models/User.model")
const Place = require("../models/Place.model");
const { isAuthenticated } = require('../middleware/jwt.middleware')



router.get("/profile", isAuthenticated, async (req, res, next) => {
    const currentUser = req.payload
    try{
        const thisUser = await User.findById(currentUser._id)
        res.json(thisUser._id);
    } catch(err){
        console.log(err)
    }
})
router.get ("/profile/my-places", isAuthenticated, async (req, res, next) => {
    const currentUser = req.payload
    try{
        const place = await Place.find({user: currentUser}).populate("place")
        console.log(place)
        res.json(place);
    } catch(err){
        console.log(err)
    }
})

module.exports = router