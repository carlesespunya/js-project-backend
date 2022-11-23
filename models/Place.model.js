const { Schema, model } = require("mongoose");

const placeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    picture: {
        timagesUrl: [String],
        required: false,
    },
    type: {
        type: Object,
        required: true,
        Beach: { type: Boolean },
        Restaurant: { type: Boolean },
        Cafeteria: { type: Boolean },
        Museum: { type: Boolean },
        Others: {type: String}
    },
    socialMedia: {
        type: [String],
        required: false,
    },
    User: { type: Schema.Types.ObjectId, ref: 'User' },
    Review: [{ type: Schema.Types.ObjectId, ref: 'Review' }],

    favorite: {
        type: Schema.Types.ObjectId, ref:"Favorite",
      },

    }
);

const Place = model("Place", placeSchema);

module.exports = Place;
