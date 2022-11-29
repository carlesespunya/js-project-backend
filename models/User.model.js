const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    userName: {
      type: String,
      required: [true, "User name is required."],
    },
    createdPlaceId:
      [{type: Schema.Types.ObjectId, ref: 'Place'}]
    ,
    image: {
      type: String,
      default: ""
    },
    reviewId:
      [{ type: Schema.Types.ObjectId, ref: 'Review' }],

    favorite: {
      type: Schema.Types.ObjectId, ref: "Favorite",
    },
    pet: 
      [{ type: Schema.Types.ObjectId, ref: "Pet"}],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
