const mongoose = require("mongoose");
const userSchema = require("./user_schema");

const budgetSchema = new mongoose.Schema(
  {
     id: {
      type: Number,
      unique: true,
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
