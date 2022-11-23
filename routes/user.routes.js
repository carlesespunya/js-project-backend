const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();
const User = require("../models/User.model")


router.get("/user-profile", async (req, res) => {
    const user = req.payload
    try {
        const userProfile = await User.findById(user._id)
        res.render("user/user-profile", {userProfile})
    } catch (error) {
        res.json(error)
    }
})

router.get("/user-profile/my-places", async (req, res) => {
    const user = req.payload
    try {
        const userProfile = await User.findById(user._id).populate("placeId")
        res.render("user/places", {userProfile})
    } catch (error) {
        res.json(error)
    }
})

router.get("/user-profile/my-places", async (req, res) => {
    const user = req.payload
    try {
        const userProfile = await User.findById(user._id).populate("placeId")
        res.render("user/places", {userProfile})
    } catch (error) {
        console.log(error)
    }
})


router.get("/user-profile/add-photo", async (req, res) => {
    const user = req.payload
    try {
        const userProfile = await User.findById(user._id).populate("placeId")
        res.render
    } catch (error) {
        console.log(error)
    }
})

module.exports = router