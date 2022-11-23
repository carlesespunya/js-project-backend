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
    fullName: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    presentationCard: {
      type: [String],
      trim: true,
    },
    telephone: {
      type: Number,
      trim: true,
    },
    images: {
      imagesUrl: [String],
    },
    description: {
      type: String,
    },
    instruments: {
      type: String,
      required: true,
      enum: ['DJ', 'Piano', 'Guitar', 'Violin', 'Drums', 'Saxophone', 'Flute', 'Cello',
        'Clarinet', 'Trumpet', 'Harp', 'Ukelele', 'Electric Guitar', 'Banjo', 'Accordion', 'Microphone']
    },
    style: {
      type: String,
      enum: ['Dance", "Folk", "Bachata", "Rock", "Reggaeton", "Rap", "Flamenco", "Classic", "Tango", "Indie","Trap", "Pop", "Electronic", "Blues", "Punk", "Jazz", "Techno", "Choir", "Trance",]
  },
    favorite: [{ type: Schema.Types.ObjectId, ref: 'Favorite' }],
    sale: [{ type: Schema.Types.ObjectId, ref: 'Sale' }],
    event: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    class: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
    rate: {
      type: Number, min: 0, max: 5
    },
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
