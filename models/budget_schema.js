const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
     id: {
      type: Number,
      unique: true,
      required: false,
     },
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  { collection: "budgetData" }
);

module.exports = mongoose.model("budgetData", budgetSchema);
