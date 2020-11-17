const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    value: {
      type: Number,
    },
  },
  { collection: "budgetData" }
);

module.exports = mongoose.model("budgetData", budgetSchema);
