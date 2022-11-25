const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    image: {
      type: String,
      default: "https://static.vecteezy.com/system/resources/previews/001/200/036/non_2x/dog-png.png",
      required: false
    },
    user: 
    {type: Schema.Types.ObjectId, ref: 'User'}, 
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Pet = model("Pet", petSchema);

module.exports = Pet;
