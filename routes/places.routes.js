const express = require("express");
const router = express.Router();
const fileUploader = require('../config/cloudinary.config');
const User = require("../models/User.model")
const Place = require("../models/Place.model")
const Review = require("../models/Review.model")
const mongoose = require("mongoose");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const { json } = require("express");
const Favorite = require("../models/Favorite");



router.post("/addPlace", isAuthenticated, fileUploader.array('pictures'), async (req, res) => {
    const { name, address, description, type, socialMedia } = req.body;
    console.log(req.file)
    const pictures = [] 
    if (req.file) {
        pictures.push(req.file.path)
    } else if (req.files) {
        req.files.forEach((file) => {
            pictures.push(file.path)
        })
    }
  
    try {
        const newPlace = await Place.create({ name, address, description, pictures, type, socialMedia, User: req.payload._id})
        const userUpdated = await User.findByIdAndUpdate(req.payload._id, { $push: { createdPlaceId: newPlace._id } })
        res.json(newPlace)

    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            res.status(500).json({ errorMessage: err.message, layout: false });
        } else if (err.code === 11000) {
            res.status(500).json({
                errorMessage:
                    "The name of the place and the address should be unique",
                layout: false
            });
        } else {
            next(err);
        }
    }
})

    // router.get("/favoritesPlaces", isAuthenticated, async (req, res) => {
    //     const UserFav = await User.findById(req.payload._id).populate("favourite")
    //     console.log(req.payload)
    //     res.json(UserFav)
    // });

    router.get("/places", async (req, res) => {
        try {
            const placeDB = await Place.find()
            res.json(placeDB)
        } catch (error) {
            res.json(error)
        }
    })

    router.get("/places/:placeId", async (req, res) => {
        const { placeId } = req.params
        try {
            const placeDB = await Place.findById(placeId).populate("User", "Review")
            res.json(placeDB)
        } catch (error) {
            res.json(error)
        }
    })

    router.put("/places/:placeId", isAuthenticated, async (req, res) => {
        const { placeId } = req.params
        const { placeUpdate } = req.body
        console.log(req.payload.email)

        try {
            const placeDb = await Place.findById(placeId)
            if (placeDb.User._id === req.payload._id){
                const placeUpdatedDB = await Place.findByIdAndUpdate(placeId, placeUpdate)
                res.json(placeUpdatedDB)
            } else{
                res.json("You can not update this place")
            }
            
        } catch (error) {
            res.json(error)
        }
    })

    router.delete("/places/:placeId", isAuthenticated, async (req, res) => {
        const { placeId } = req.params
        try {
            const placeDb = await Place.findById(placeId)
            if (placeDb.User._id === req.payload._id){
                const placeDeleted = await Project.findByIdAndRemove(placeId)
                res.json({ message: `project with id ${placeDeleted._id} was deleted` })
            } else{
                res.json("You can not delete this place")
            }
        } catch (error) {
            res.json(error)
        }
    })




    router.get("/addReview/:placeId", isAuthenticated, (req, res) => {
        res.json(req.params.placeId)
    });

    router.post("/addReview/:placeId", isAuthenticated, async (req, res) => {
        try {
            const userSaved = await User.findById(req.payload._id)
            const placeSaved = await Place.findById(req.params.placeId)
            const review = {
                check: body.check,
                comment: body.comment,
                place: placeSaved,
                user: userSaved
            }

            const newReview = await Review.create(review)
            await Place.findByIdAndUpdate(req.params.placeId, { $push: { Review: newReview._id } });
            await User.findByIdAndUpdate(req.payload._id, { $push: { reviewId: newReview._id } });
            res.json(newReview)
           
        } catch (err) {
            console.log(err)
        }
    })

    router.post("/favorite/:restaurantId",async(req,res) => {
        const placeId = req.params.placeId   
        const user = req.payload
        try{
            let favoritesDB = await Favorite.find ({place:placeId, user:user._id})
            if(favoritesDB.length ===0){
                let newFavorite = await Favorite.create({user:user._id, place:placeId})
                res.redirect(`/place/${placeId}`)
        } else {
            res.redirect(`/place/${placeId}`)
        }
    
    } catch (error) {
        console.log(error)
    }   
    }),
    
module.exports = router;