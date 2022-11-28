const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();
const User = require("../models/User.model")
const fileUploader = require('../config/cloudinary.config');
const { isAuthenticated } = require("../middleware/jwt.middleware")


router.get("/user-profile/:userId", async (req, res) => {
    const { userId } = req.params

    try {

        const userProfile = await User.findById(userId).populate(
          "createdPlaceId",
          "pet"
        );

        res.json(userProfile)
    } catch (error) {
        res.json("no users")
    }
})

router.post("/user-profile/edit-photo", fileUploader.single('image'), isAuthenticated, async (req, res) => {

    const user = req.payload

    try {
        const newPhoto = await User.findByIdAndUpdate(user._id, { image: req.file.path })
        res.json(newPhoto)
    } catch (err) {
        res.json(err)
    }
})


router.get("/profile", isAuthenticated, async (req, res, next) => {
    const currentUser = req.payload
    try{
        const thisUser = await User.findById(currentUser._id).populate("createdPlaceId pet")
        console.log(thisUser)
        res.json(thisUser);

    } catch(err){
        console.log(err)
    }
})


module.exports = router