const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();
const Pet = require("../models/Pet.model")
const User = require("../models/User.model")
const { isAuthenticated } = require('../middleware/jwt.middleware');

const fileUploader = require('../config/cloudinary.config');

router.post("/pet-profile/create", fileUploader.single ('image'), isAuthenticated, async (req, res,next) => {
    const user = req.payload
    const {name, image}= req.body
    try {
        const petProfile = await Pet.create({name,image:req.file.path})
        res.json (petProfile);
    } catch (error) {
        res.json(error)
    }
})


router.get("/pet-profile", isAuthenticated, async (req, res,next) => {
    try {
        const petProfile = await Pet.find()
        res.json (petProfile);
    } catch (error) {
        res.json(error)
    }
})

router.post("/pet-profile/add-photo", fileUploader.single ('image'), isAuthenticated, async (req, res) => {
    const user = req.payload
    try {
        const petImage = await Pet.findByIdAndUpdate(user._id, {image:req.file.path})
        res.json (petImage)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router