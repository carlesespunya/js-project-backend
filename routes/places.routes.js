const express = require("express");
const router = express.Router();
const fileUploader = require('../config/cloudinary.config');
const User = require("../models/User.model")
const Place = require("../models/Place.model")
const Review = require("../models/Review.model")

const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const { json } = require("express");



router.post("/addPlace", isAuthenticated, fileUploader.array('images'), async (req, res) => {
    const { name, address, description, picture, Beach, Restaurant, Cafeteria, Museum, Others, socialMedia } = req.body;
    console.log(req)
    const pictures = { imagesUrl: [] }
    if (req.file) {
        pictures.imagesUrl.push(req.file.path)
    } else if (req.files) {
        req.files.forEach((file) => {
            pictures.imagesUrl.push(file.path)
        })
    }
    const type = {}
    if (Beach) { type.Beach = true }
    if (Restaurant) { type.Restaurant = true }
    if (Cafeteria) { type.Cafeteria = true }
    if (Museum) { type.Museum = true }
    if (Others) { type.Others = Others }

    try {
        const newPlace = await Place.create({ name, address, description, pictures, type, socialMedia })
        res.json(newPlace)

    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            res.status(500).json({ errorMessage: err.message, layout: false });
        } else if (err.code === 11000) {
            res.status(500).json({
                errorMessage:
                    "The name of the spot and the coordinates should be unique",
                layout: false
            });
        } else {
            next(err);
        }
    }

    // router.get("/favoritesPlaces", isAuthenticated, async (req, res) => {
    //     const UserFav = await User.findById(req.payload._id).populate("favourite")
    //     console.log(req.payload)
    //     res.json(UserFav)
    // });

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
        try {
            const placeDB = await Place.findByIdAndUpdate(placeId, placeUpdate)
            res.json(placeDB)
        } catch (error) {
            res.json(error)
        }
    })

    router.delete("/places/:placeId", isAuthenticated, async (req, res) => {
        const { placeId } = req.params
        try {
            const placeDeleted = await Project.findByIdAndRemove(placeId)
            res.json({ message: `project with id ${placeDeleted._id} was deleted` })
        } catch (error) {
            res.json(error)
        }
    })


    router.get("/places", async (req, res) => {
        try {
            const placeDB = await Place.find()
            res.json(placeDB)
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

})



module.exports = router;