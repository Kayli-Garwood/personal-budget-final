const mongoose = require("mongoose");
//const budgetSchema = require("./userBudget_schema");

const budgetSchema = new mongoose.Schema(
  {
    // user: String,
    // required: true,
    // related_data: {
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
