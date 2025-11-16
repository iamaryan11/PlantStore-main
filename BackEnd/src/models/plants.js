const mongoose = require("mongoose");
const { Schema } = mongoose;
const plantSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: true,
      trim: true,
    },
    price: {
      type: Number,

      required: true,
      trim: true,
    },
    categories: {
      type: [String], // so that hum different cats add krske
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    imageUrl: {
      type: String,

      trim: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Plants = mongoose.model("plants", plantSchema);
module.exports = Plants;
